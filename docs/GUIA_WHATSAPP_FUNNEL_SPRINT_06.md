# Guía WhatsApp funnel · Sprint 06

## Fuente del número

Los botones toman el WhatsApp desde:

```txt
/admin/perfil > WhatsApp
```

Ese campo corresponde a:

```txt
profile.whatsapp_url
```

## Formatos aceptados

Puedes guardar cualquiera de estos formatos:

```txt
573118773089
+57 311 877 3089
https://wa.me/573118773089
https://api.whatsapp.com/send?phone=573118773089
```

El sistema normaliza el número automáticamente.

## Fallback

Si el campo WhatsApp está vacío, contiene `#` o es inválido, los botones redirigen a:

```txt
/contacto
```

## Botones afectados

### Home

Botón:

```txt
Hablemos de una idea
```

Mensaje:

```txt
Hola, quiero hablarte de una idea
```

### Servicios

Cada servicio usa el texto del CTA.

Ejemplo:

```txt
CTA: Construir un MVP
Mensaje: Hola, quiero Construir un MVP
```

Si creas un nuevo servicio con CTA:

```txt
Auditar mi producto digital
```

El mensaje será:

```txt
Hola, quiero Auditar mi producto digital
```

### Contacto

En la caja `Contacto directo`, aparece un botón de WhatsApp junto al correo si el número existe.

### Proyectos individuales

Cada proyecto agrega un CTA contextual:

```txt
Hola, vi tu proyecto [nombre] y quiero hablar de algo parecido
```
