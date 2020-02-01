import express from 'express';

declare global {
  namespace Models {
    export interface UserModel {
      name: string;
    }
  }
}
