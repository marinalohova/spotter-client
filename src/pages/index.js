import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { listBeatsheets } from '../apollo/queries/beatsheet';

export default function Dashboard(props) {
  const { beatsheets } = props;

  return (
      <div>
        <Grid container direction="column"
              alignItems="stretch"
              justifyContent="center">
          <h1>Your Beatsheets</h1>
        </Grid>
        <Grid container direction="column">{
            beatsheets && beatsheets.map(beatsheet =>
                <Grid sx={{ my: 2 }} xs={12} container direction="column">
                  <Grid item>
                      <h3><a href={`/${beatsheet.id}`}>
                        {beatsheet.title}
                      </a></h3>
                    {beatsheet.acts.edges && beatsheet.acts.edges.length > 0 &&
                      <h4>{beatsheet.acts.edges.map(act => act.description).join(' ')}...</h4>
                    }
                  </Grid>
                  <Grid item>
                    <a href={`/${beatsheet.id}`}>Read More &#x2192;</a>
                  </Grid>
            </Grid>)
        }
        </Grid>
      </div>
  );
}

export async function getStaticProps() {
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
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { beatsheets: data.data.listBeatsheets.edges },
  };
}