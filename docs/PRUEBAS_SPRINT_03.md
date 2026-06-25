# Pruebas Sprint 03

## Pruebas públicas

```txt
/
/proyectos
/proyectos/funded-os-traders-fondeo
/servicios
/sobre-mi
/contacto
```

Verifica que sigan funcionando igual que en Sprint 02.

## Pruebas admin

1. Entra a `/admin` sin sesión.
2. Debe redirigir a `/admin/login`.
3. Entra con correo no autorizado.
4. Debe bloquear acceso.
5. Entra con correo autorizado y contraseña de Supabase Auth.
6. Debe abrir `/admin`.

## Proyectos

1. Entra a `/admin/proyectos`.
2. Crea un proyecto nuevo.
3. Márcalo como publicado.
4. Verifica que aparece en `/proyectos`.
5. Márcalo como destacado.
6. Ajusta `featuredOrder`.
7. Verifica que puede aparecer en home.
8. Edita un texto.
9. Verifica cambio público.
10. Elimina un proyecto de prueba.

## Servicios

1. Entra a `/admin/servicios`.
2. Crea un servicio.
3. Actívalo.
4. Verifica que aparece en `/servicios`.
5. Edita precio, CTA o descripción.
6. Desactívalo.
7. Verifica que desaparece de la página pública.

## Perfil

1. Entra a `/admin/perfil`.
2. Cambia `headline` o `bio corta`.
3. Guarda.
4. Verifica `/sobre-mi` y home.

## Mensajes

1. Envía un formulario desde `/contacto`.
2. Entra a `/admin/mensajes`.
3. Cambia el estado a `Respondido`.
4. Elimina un mensaje de prueba.

## Validación técnica

```powershell
npm run typecheck
```

En esta entrega `typecheck` fue validado correctamente. En el entorno de generación, `next build` compiló y pasó TypeScript, pero se quedó detenido en la fase de `Collecting page data`; por eso se recomienda validar `npm run build` en tu máquina después de configurar `.env.local`.
