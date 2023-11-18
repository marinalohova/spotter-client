import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { Editor } from "novel";
import { getBeatsheet, updateBeatsheet } from '../apollo/queries/beatsheet';
const FORMAT = /(.+) \(([0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2})\) (.+)/g;

export default function Beatsheet(props) {
  const { beatsheet } = props;
  const [content, setContent] = useState({
    type:'doc',
    content: beatsheet.acts.edges.reduce((memo, act) => {
      const beats = act.beats.edges.reduce((memo, { title, duration, description }, index) =>
          [...memo, { type: "paragraph", content: [{
              type: "text",
              text: `${title} (${duration}) ${description}`,
            }] }], []);
      return [...memo, {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: act.description }],
      }, ...beats]
    }, [])
  });
  const [update, { data, error, loading}] = useMutation(updateBeatsheet);

  const handleUpdate = async (editor) => {
    const document = editor.getJSON();
    await setContent(document);
    let shouldUpdate = false;
    const content = document.content.map((value) => {
      if (value.type ==='paragraph' && value.content)  {
        const [...match] = value.content[0].text.matchAll(FORMAT);
        if (!match.length && !value.content[0].marks) {
          shouldUpdate = true;
          return { ...value, content: [{...value.content[0], marks: [{ attrs: { color:'#E00000' }, type: "textStyle" }]}] };
        }
        if (match.length > 0 && value.content[0].marks) {
          shouldUpdate = true;
          const [{marks, ...rest}] = value.content;
          return {...value, content: [rest]};
        }
      }
      return value;
    });
    if (shouldUpdate) {
      editor.commands.setContent({...document, content}, true);
    }
  }

  const handleClick = async() => {
    if (content) {
      const acts = content.content.reduce((memo, value) => {
        if (value.type ==='heading' && value.content) {
          return [...memo, { description: value.content[0].text }];
        }
        if (value.type ==='paragraph' && value.content)  {
          const match = value.content[0].text.matchAll(FORMAT);
          if (match) {
            const [groups] =  [...match];
            if (groups) {
              const [, title, duration, description] = groups;
              const { beats = [], ...rest } = memo[memo.length - 1];
              return memo.toSpliced(-1, 1, {
                description: `Untitled Act ${memo.length + 1}`,
                ...rest,
                beats: [...beats, {
                  title,
                  duration,
                  description,
                }]
              });
            }
          }
        }
        return memo;
      }, []);

      await update({
        variables: {
          input: { id: beatsheet.id, acts },
        },
      });
    }
  }

  return (
    <Grid container direction="column">
      <Grid sx={{ my: 2 }} container direction="row" justifyContent="space-between" alignItems="stretch">
        <a href={'/'}>&#8592; Back to Your Beatsheets</a>
        {loading ? <span>Saving....</span> : <Button size="small" variant="text" onClick={handleClick}>Save</Button> }
      </Grid>
      <Grid sx={{ my: 2 }} container direction="row" alignItems="stretch">
        <h1>{ beatsheet.title }</h1>
      </Grid>
      <Editor disableLocalStorage={true} defaultValue={content} onDebouncedUpdate={handleUpdate}/>
    </Grid>
  );
};

export async function getServerSideProps(context) {
  const { params: { beatsheet } } = context;
  const res = await fetch(process.env.API_HOST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: getBeatsheet,
      variables: {
        input: {
          id: beatsheet,
        },
      },
    }),
  });
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { beatsheet: data.data.getBeatsheet },
  };
}