import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { Editor } from "novel";
import { getBeatsheet, upsertBeatsheet, listBeatsheets } from '../apollo/queries/beatsheet';

export default function Beatsheet(props) {
  const { beatsheet } = props;
  const [content, setContent] = useState({
    type:'doc',
    content: beatsheet.acts.edges.reduce((memo, act) => {
      const beats = act.beats.edges.reduce((memo, { title, duration, description }) =>
          [...memo, { type: "paragraph", content: [{
              type: "text",
              text: `${title} ${duration} ${description}`,
            }] }], []);
      return [...memo, {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: act.description }],
      }, ...beats]
    }, [])
  });
  const [upsert, { data, error, loading}] = useMutation(upsertBeatsheet);

  const handleUpdate = (editor) => {
    const { content } = editor.getJSON();
    const data = content.reduce((memo, value) => {
        if (value.type ==='heading') {
          return { ...memo, acts: [...memo.acts, { description: value.content[0].text}]}
        }
      if (value.type ==='paragraph') {
        const act = memo.acts[memo.acts.length - 1];
        const regex = /(.+) \(([0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2})\) (.+)/g;
        const match = value.content && value.content[0].text.matchAll(regex);

        if (match) {
          const [groups] =  [...match];
          if (groups) {
            const [, title, duration, description] = groups;
            return {
              ...memo,
              acts: memo.acts.toSpliced(-1, 1, {
                ...act, beats: [...(act.beats || []), {
                  title,
                  duration,
                  description,
                }]
              })
            };
          }
        }
      }
      return memo;
    }, { id: beatsheet.id, acts: [] });

    setContent(data);
  }
  const handleClick = (e) => {
    if (content) {
      upsert({
        variables: {
          input: content,
        },
      });
    }
  }
  
  return (
    <div>
      <Grid sx={{ my: 2 }} container direction="row" justifyContent="space-between" alignItems="stretch">
        <a href={'/'}>&#8592; Back to Your Beatsheets</a>
        <Button size="small" variant="text" onClick={handleClick}>Save</Button>
      </Grid>
      <Grid sx={{ my: 2 }} container direction="row" alignItems="stretch">
        <h1>{ beatsheet.title }</h1>
      </Grid>
      <Editor disableLocalStorage={true} defaultValue={content} onDebouncedUpdate={handleUpdate}/>
    </div>
  );
};

export async function getStaticProps(context) {
  const { params: { beatsheet } } = context;
  const res = await fetch(process.env.API_HOST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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

export async function getStaticPaths() {
  const res = await fetch(process.env.API_HOST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: listBeatsheets,
    }),
  });
  const data = await res.json();
  const paths = data.data.listBeatsheets.edges.map(({ id }) => ({
    params: { beatsheet: id },
  }));
  return { paths, fallback: 'blocking' };
}
