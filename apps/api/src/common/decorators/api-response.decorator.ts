import { applyDecorators, Type } from '@nestjs/common';
import { getSchemaPath, ApiExtraModels, ApiResponse } from '@nestjs/swagger';

export const ApiBaseResponse = <TModel extends Type<any>>(
  model: TModel,
  options: { isArray?: boolean; status?: number; description?: string } = {},
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      status: options.status || 200,
      description: options.description || '',
      schema: {
        properties: {
          success: { type: 'boolean', default: true },
          data: options.isArray
            ? { type: 'array', items: { $ref: getSchemaPath(model) } }
            : { $ref: getSchemaPath(model) },
        },
      },
    }),
  );
};

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  options: { status?: number; description?: string } = {},
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      status: options.status || 200,
      description: options.description || 'Успешный ответ с пагинацией',
      schema: {
        properties: {
          success: { type: 'boolean', default: true },
          data: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              meta: {
                type: 'object',
                properties: {
                  total: { type: 'number', example: 100 },
                  page: { type: 'number', example: 1 },
                  limit: { type: 'number', example: 10 },
                  totalPages: { type: 'number', example: 10 },
                },
              },
            },
          },
        },
      },
    }),
  );
};
