// ===================================
// CONFIGURACIÓN DE COCOMORA VIRTUAL
// ===================================

// Número de WhatsApp en formato internacional.
// México: 52 + número de teléfono, sin espacios ni signos.
const WHATSAPP = "522219751636";

// ===================================
// PRODUCTOS DEL MENÚ
// ===================================

// Para cambiar un precio, modifica price.
// Ejemplo: price: 95
// Si todavía no conoces el precio, utiliza price: null.

const productosMenu = [
    {
        id: 1,
        nombre: "Omelette clásico",
        categoria: "Omelettes",
        descripcion: "Omelette preparado al momento para comenzar bien el día.",
        precio: null,
        imagen: "imagenes/omelette-clasico.jpg",
        emoji: "🍳"
    },
    {
        id: 2,
        nombre: "Omelette de jamón y queso",
        categoria: "Omelettes",
        descripcion: "Una combinación deliciosa de jamón y queso.",
        precio: null,
        imagen: "imagenes/omelette-jamon-queso.jpg",
        emoji: "🍳"
    },
    {
        id: 3,
        nombre: "Panini de jamón y queso",
        categoria: "Paninis",
        descripcion: "Panini doradito con jamón y queso derretido.",
        precio: null,
        imagen: "imagenes/panini-jamon-queso.jpg",
        emoji: "🥪"
    },
    {
        id: 4,
        nombre: "Panini especial",
        categoria: "Paninis",
        descripcion: "Una opción deliciosa para disfrutar a cualquier hora.",
        precio: null,
        imagen: "imagenes/panini-especial.jpg",
        emoji: "🥪"
    },
    {
        id: 5,
        nombre: "Croissant",
        categoria: "Croissants",
        descripcion: "Croissant de textura hojaldrada, ideal para acompañar tu café.",
        precio: null,
        imagen: "imagenes/croissant.jpg",
        emoji: "🥐"
    },
    {
        id: 6,
        nombre: "Croissant relleno",
        categoria: "Croissants",
        descripcion: "Una opción especial para disfrutar en tu desayuno.",
        precio: null,
        imagen: "imagenes/croissant-relleno.jpg",
        emoji: "🥐"
    },
    {
        id: 7,
        nombre: "Desayuno especial",
        categoria: "Desayunos",
        descripcion: "Una opción rica y reconfortante para comenzar tu mañana.",
        precio: null,
        imagen: "imagenes/desayuno-especial.jpg",
        emoji: "🍽️"
    },
    {
        id: 8,
        nombre: "Desayuno completo",
        categoria: "Desayunos",
        descripcion: "Disfruta un desayuno ideal para compartir un buen momento.",
        precio: null,
        imagen: "imagenes/desayuno-completo.jpg",
        emoji: "🍳"
    },
    {
        id: 9,
        nombre: "Café americano",
        categoria: "Café",
        descripcion: "Café caliente, perfecto para acompañar tus alimentos.",
        precio: null,
        imagen: "imagenes/cafe-americano.jpg",
        emoji: "☕"
    },
    {
        id: 10,
        nombre: "Café con leche",
        categoria: "Café",
        descripcion: "Una bebida suave y cremosa para tu momento de descanso.",
        precio: null,
        imagen: "imagenes/cafe-con-leche.jpg",
        emoji: "☕"
    },
    {
        id: 11,
        nombre: "Postre del día",
        categoria: "Postres",
        descripcion: "Un antojo dulce para hacer especial tu día.",
        precio: null,
        imagen: "imagenes/postre.jpg",
        emoji: "🍰"
    },
    {
        id: 12,
        nombre: "Pastel individual",
        categoria: "Postres",
        descripcion: "Un delicioso postre para acompañar tu bebida favorita.",
        precio: null,
        imagen: "imagenes/pastel.jpg",
        emoji: "🧁"
    },
    {
        id: 13,
        nombre: "Frappé de café",
        categoria: "Frappés",
        descripcion: "Bebida fría con sabor a café, ideal para refrescarte.",
        precio: null,
        imagen: "imagenes/frappe-cafe.jpg",
        emoji: "🥤"
    },
    {
        id: 14,
        nombre: "Frappé de chocolate",
        categoria: "Frappés",
        descripcion: "Una bebida fría con un delicioso sabor a chocolate.",
        precio: null,
        imagen: "imagenes/frappe-chocolate.jpg",
        emoji: "🍫"
    },
    {
        id: 15,
        nombre: "Frappé de fresa",
        categoria: "Frappés",
        descripcion: "Una bebida fría con un toque dulce y frutal.",
        precio: null,
        imagen: "imagenes/frappe-fresa.jpg",
        emoji: "🍓"
    }
];

// ===================================
// REFERENCIAS A LOS ELEMENTOS HTML
// ===================================

const contenedorCategorias = document.getElementById("categorias");
const contenedorProductos = document.getElementById("productos");
const anio = document.getElementById("anio");

// Categoría seleccionada al abrir la página.
let categoriaActiva = "Todos";

// ===================================
// FORMATO DE PRECIOS
// ===================================

function mostrarPrecio(precio) {
    if (precio === null || precio === undefined || precio === "") {
        return "Precio por confirmar";
    }

    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 2
    }).format(precio);
}

// ===================================
// CREAR BOTONES DE CATEGORÍAS
// ===================================

function mostrarCategorias() {
    const categorias = [
        "Todos",
        ...new Set(productosMenu.map(producto => producto.categoria))
    ];

    contenedorCategorias.replaceChildren();

    categorias.forEach(categoria => {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "categoria-btn";
        boton.textContent = categoria;

        boton.classList.toggle(
            "activa",
            categoria === categoriaActiva
        );

        boton.setAttribute(
            "aria-pressed",
            String(categoria === categoriaActiva)
        );

        boton.addEventListener("click", () => {
            categoriaActiva = categoria;
            mostrarCategorias();
            mostrarProductos();
        });

        contenedorCategorias.appendChild(boton);
    });
}

// ===================================
// MOSTRAR LAS FOTOGRAFÍAS
// ===================================

function crearImagen(producto) {
    const contenedor = document.createElement("div");
    contenedor.className = "producto-imagen";

    const imagen = document.createElement("img");

    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.loading = "lazy";

    // Si no existe la fotografía, se muestra un emoji.
    imagen.addEventListener("error", () => {
        contenedor.replaceChildren();

        const emoji = document.createElement("span");
        emoji.className = "producto-emoji";
        emoji.textContent = producto.emoji;

        contenedor.appendChild(emoji);
    }, { once: true });

    contenedor.appendChild(imagen);

    return contenedor;
}

// ===================================
// CREAR TARJETAS DE PRODUCTOS
// ===================================

function mostrarProductos() {
    contenedorProductos.replaceChildren();

    const productosFiltrados =
        categoriaActiva === "Todos"
            ? productosMenu
            : productosMenu.filter(
                producto => producto.categoria === categoriaActiva
            );

    if (productosFiltrados.length === 0) {
        const mensaje = document.createElement("p");

        mensaje.className = "mensaje-vacio";
        mensaje.textContent = "No hay productos en esta categoría.";

        contenedorProductos.appendChild(mensaje);
        return;
    }

    productosFiltrados.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto";

        tarjeta.appendChild(crearImagen(producto));

        const contenido = document.createElement("div");
        contenido.className = "producto-contenido";

        const categoria = document.createElement("p");
        categoria.className = "producto-categoria";
        categoria.textContent = producto.categoria;

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.className = "producto-descripcion";
        descripcion.textContent = producto.descripcion;

        const pie = document.createElement("div");
        pie.className = "producto-pie";

        const precio = document.createElement("span");
        precio.className = "producto-precio";
        precio.textContent = mostrarPrecio(producto.precio);

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "boton-pedido";
        boton.textContent = "Pedir por WhatsApp";

        boton.addEventListener("click", () => {
            pedirProducto(producto);
        });

        pie.append(precio, boton);

        contenido.append(
            categoria,
            nombre,
            descripcion,
            pie
        );

        tarjeta.appendChild(contenido);
        contenedorProductos.appendChild(tarjeta);
    });
}

// ===================================
// ENVIAR PEDIDO POR WHATSAPP
// ===================================

function pedirProducto(producto) {
    let precioTexto;

    if (
        producto.precio === null ||
        producto.precio === undefined ||
        producto.precio === ""
    ) {
        precioTexto = "Por confirmar";
    } else {
        precioTexto = mostrarPrecio(producto.precio);
    }

    const mensaje = [
        "¡Hola, Cocomora Virtual!",
        "",
        "Me interesa hacer un pedido.",
        "",
        `Producto: ${producto.nombre}`,
        `Categoría: ${producto.categoria}`,
        `Precio publicado: ${precioTexto}`,
        "",
        "Mi modalidad de pedido es:",
        "Consumo en el local o recogida.",
        "",
        "¿Me pueden dar más información? Gracias."
    ].join("\n");

    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank", "noopener,noreferrer");
}

// ===================================
// INICIAR LA PÁGINA
// ===================================

function iniciarPagina() {
    anio.textContent = new Date().getFullYear();

    mostrarCategorias();
    mostrarProductos();
}

iniciarPagina();