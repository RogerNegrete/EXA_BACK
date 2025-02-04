import { z } from "zod";

export const validarArticulo = (data) => {
  const schema = z.object({
    estacion: z.Number.optional(),
    nivel_productividad: z.string(),
    produccion_dia: z.Number(),
    total_produccion: z.Number()
  });

  return schema.safeParse(data);
};

export const validarParcial = (data) => {
  const schema = z.object({
    estacion: z.Number.optional(),
    nivel_productividad: z.string(),
    produccion_dia: z.Number(),
    total_produccion: z.Number()

  });

  return schema.safeParse(data);
};

export const validarUsuario = (usuario) => usuarioSchema.safeParse(usuario);
export const validarCliente = (cliente) => clienteSchema.safeParse(cliente);
