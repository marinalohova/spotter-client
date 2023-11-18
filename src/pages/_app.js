import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import styles from '../styles.css';
import theme from '../theme';
import 'core-js';
import Container from '../components/layout/Container';
import client from '../apollo';

const clientSideEmotionCache = createEmotionCache();
export default function MyApp(props) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
      <CacheProvider value={emotionCache}>
        <ApolloProvider client={ client }>
            <ThemeProvider theme={ theme }>
              <CssBaseline />
              <Container>
                <Component {...pageProps} />
              </Container>
            </ThemeProvider>
        </ApolloProvider>
      </CacheProvider>
  );
}