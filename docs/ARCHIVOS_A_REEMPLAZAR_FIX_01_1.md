# Archivos a reemplazar desde este ZIP

Copia estos archivos desde el ZIP hacia la misma ubicación dentro de tu proyecto:

```txt
components/layout/Navbar.tsx
components/services/ServiceCard.tsx
app/sobre-mi/page.tsx
lib/mock-data.ts
types/index.ts
```

## Importante sobre tu foto

No reemplaces ni borres tu archivo:

```txt
public/profile/santie-profile.jpg
```

El código ahora busca exactamente esa ruta. Para que tu foto salga:

1. El archivo debe estar en `public/profile/`.
2. Debe llamarse exactamente `santie-profile.jpg`.
3. Si tu foto está en `.png` o `.jpeg`, cambia el nombre/extensión o actualiza `profileImageUrl` en `lib/mock-data.ts`.
4. Después de cambiar la foto, reinicia el servidor si no aparece:

```bash
Ctrl + C
npm run dev
```

5. Haz recarga fuerte en el navegador:

```txt
Ctrl + F5
```
