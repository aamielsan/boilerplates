import { NextPageContext } from 'next';
import Router from 'next/router';

export const redirect = (target: string, ctx?: NextPageContext) => {
  if (ctx && ctx.res) {
    ctx.res.writeHead(303, { Location: target });
    ctx.res.end();
  } else {
    Router.replace(target);
  }
}