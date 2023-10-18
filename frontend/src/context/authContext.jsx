import { createContext, useState, useEffect, useCallback } from "react";
import { getAllUser, URL_user, getAuthByUser } from "../services/authServices";

export const AuthCtx = createContext([]);

export const AuthCtxProvider = ({children}) =>{

    
}