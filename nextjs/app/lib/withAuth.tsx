import { NextPage } from 'next';
import { ComponentType, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { redirect } from '../lib';
import { selectors as authSelectors } from '../modules/auth';
import Router from 'next/router';

export const withAuth = () => (BaseComponent: ComponentType & NextPage) => {
  const AuthComponent = (props: any) => {
    const user = useSelector(authSelectors.makeUserSelector());

    useEffect(() => {
      if (!user) {
        Router.replace('/login');
      }
    }, []);

    if (!user) {
      return null;
    }

    return <BaseComponent {...props} />;
  };

  AuthComponent.getInitialProps = async (ctx: any) => {
    const { req } = ctx;

    // Server side auth checks
    if (req) {
      if (!req.user) {
        return redirect('/login', ctx);
      }
    }

    const baseProps = (BaseComponent.getInitialProps)
      ? await BaseComponent.getInitialProps(ctx)
      : {};

    return {
      ...baseProps,
    };
  }

  return AuthComponent;
};