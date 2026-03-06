/* eslint-disable */
// @ts-nocheck
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  RegistrationDto
} from '../model';

import { instance } from '../../instance';

type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Регистрация нового пользователя
 */
export type usersControllerCreateResponse201 = {
  data: void
  status: 201
}

export type usersControllerCreateResponse400 = {
  data: void
  status: 400
}

export type usersControllerCreateResponse409 = {
  data: void
  status: 409
}

export type usersControllerCreateResponseSuccess = (usersControllerCreateResponse201) & {
  headers: Headers;
};
export type usersControllerCreateResponseError = (usersControllerCreateResponse400 | usersControllerCreateResponse409) & {
  headers: Headers;
};

export type usersControllerCreateResponse = (usersControllerCreateResponseSuccess | usersControllerCreateResponseError)

export const getUsersControllerCreateUrl = () => {


  

  return `/api/users/register`
}

export const usersControllerCreate = async (registrationDto: RegistrationDto, options?: RequestInit): Promise<usersControllerCreateResponse> => {
  
  return instance<usersControllerCreateResponse>(getUsersControllerCreateUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      registrationDto,)
  }
);}
  



export const getUsersControllerCreateMutationOptions = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerCreate>>, TError,{data: RegistrationDto}, TContext>, request?: SecondParameter<typeof instance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerCreate>>, TError,{data: RegistrationDto}, TContext> => {

const mutationKey = ['usersControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerCreate>>, {data: RegistrationDto}> = (props) => {
          const {data} = props ?? {};

          return  usersControllerCreate(data,requestOptions)
        }



        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerCreate>>>
    export type UsersControllerCreateMutationBody = RegistrationDto
    export type UsersControllerCreateMutationError = void

    /**
 * @summary Регистрация нового пользователя
 */
export const useUsersControllerCreate = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerCreate>>, TError,{data: RegistrationDto}, TContext>, request?: SecondParameter<typeof instance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerCreate>>,
        TError,
        {data: RegistrationDto},
        TContext
      > => {
      return useMutation(getUsersControllerCreateMutationOptions(options), queryClient);
    }
    /**
 * @summary Получить список всех пользователей
 */
export type usersControllerFindAllResponse200 = {
  data: void
  status: 200
}

export type usersControllerFindAllResponseSuccess = (usersControllerFindAllResponse200) & {
  headers: Headers;
};
;

export type usersControllerFindAllResponse = (usersControllerFindAllResponseSuccess)

export const getUsersControllerFindAllUrl = () => {


  

  return `/api/users`
}

export const usersControllerFindAll = async ( options?: RequestInit): Promise<usersControllerFindAllResponse> => {
  
  return instance<usersControllerFindAllResponse>(getUsersControllerFindAllUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }
);}
  




export const getUsersControllerFindAllQueryKey = () => {
    return [
    `/api/users`
    ] as const;
    }

    
export const getUsersControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerFindAll>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof instance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerFindAllQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerFindAll>>> = ({ signal }) => usersControllerFindAll({ signal, ...requestOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerFindAll>>>
export type UsersControllerFindAllQueryError = unknown


export function useUsersControllerFindAll<TData = Awaited<ReturnType<typeof usersControllerFindAll>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof usersControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof instance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerFindAll<TData = Awaited<ReturnType<typeof usersControllerFindAll>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof usersControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof instance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerFindAll<TData = Awaited<ReturnType<typeof usersControllerFindAll>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof instance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Получить список всех пользователей
 */

export function useUsersControllerFindAll<TData = Awaited<ReturnType<typeof usersControllerFindAll>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof instance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerFindAllQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}




/**
 * @summary Удалить пользователя по ID
 */
export type usersControllerRemoveResponse200 = {
  data: void
  status: 200
}

export type usersControllerRemoveResponse404 = {
  data: void
  status: 404
}

export type usersControllerRemoveResponseSuccess = (usersControllerRemoveResponse200) & {
  headers: Headers;
};
export type usersControllerRemoveResponseError = (usersControllerRemoveResponse404) & {
  headers: Headers;
};

export type usersControllerRemoveResponse = (usersControllerRemoveResponseSuccess | usersControllerRemoveResponseError)

export const getUsersControllerRemoveUrl = (id: number,) => {


  

  return `/api/users/${id}`
}

export const usersControllerRemove = async (id: number, options?: RequestInit): Promise<usersControllerRemoveResponse> => {
  
  return instance<usersControllerRemoveResponse>(getUsersControllerRemoveUrl(id),
  {      
    ...options,
    method: 'DELETE'
    
    
  }
);}
  



export const getUsersControllerRemoveMutationOptions = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerRemove>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof instance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerRemove>>, TError,{id: number}, TContext> => {

const mutationKey = ['usersControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerRemove>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  usersControllerRemove(id,requestOptions)
        }



        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerRemove>>>
    
    export type UsersControllerRemoveMutationError = void

    /**
 * @summary Удалить пользователя по ID
 */
export const useUsersControllerRemove = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerRemove>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof instance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerRemove>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getUsersControllerRemoveMutationOptions(options), queryClient);
    }
    