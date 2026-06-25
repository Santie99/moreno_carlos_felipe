# Pruebas Sprint 02

## Pruebas antes de Supabase

1. Ejecuta `npm run dev` sin `.env.local`.
2. Verifica que la web cargue con datos mock.
3. Entra a:
   - `/`
   - `/proyectos`
   - `/servicios`
   - `/sobre-mi`
   - `/contacto`
4. Envía el formulario. Debe decir que Supabase no está configurado.

## Pruebas después de Supabase

1. Ejecuta `schema.sql`.
2. Ejecuta `seed.sql`.
3. Configura `.env.local`.
4. Reinicia `npm run dev`.
5. Revisa que la web cargue igual.
6. Cambia un texto en Supabase y verifica que la web lo refleje.
7. Envía un mensaje desde `/contacto`.
8. Verifica que aparezca en `contact_messages`.

## Pruebas técnicas

Ejecuta:

```bash
npm run typecheck
npm run build
```

Ambos deben terminar sin errores.
