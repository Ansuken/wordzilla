const words: Record<string, string[]> = {
    "5": [
        "amigo", "lapiz", "coche", "perro", "gatos", "manos", "mesas", "silla", "nubes", "campo",
        "libro", "arbol", "traje", "cruce", "pared", "barra", "joven", "suave", "oruga", "oeste",
        "cinta", "huevo", "donde", "salud", "corto", "lento", "subir", "andar", "pedir", "canto",
        "sueno", "rodeo", "flaco", "graso", "erizo", "focos", "brisa", "gasto", "ajeno", "anexo",
        "borde", "circo", "citar", "techo", "rumbo", "cesto", "dedos", "botas", "coral", "juego"
    ],
    "6": [
        "amable", "felino", "viajar", "templo", "danzar", "grande", "abrigo", "bailar", "camino", "casual",
        "cocina", "dejame", "bodega", "agujas", "soneto", "anotar", "espero", "ganado", "cestas", "futbol",
        "aromas", "hojear", "impone", "llevar", "maizal", "maleta", "mirada", "molino", "musica", "nacera",
        "rapido", "regalo", "relato", "selvas", "tomate", "urdido", "vacuna", "valles", "verdad", "viajes",
        "cambio", "cargas", "celdas", "velero", "versos", "visual", "enviar", "otorgo", "cerrar", "justos"
    ],
    "7": [
        "hermoso", "caminar", "ventana", "elegido", "escalar", "ganador", "marisco", "musical", "pensaba", "portada",
        "prision", "probaba", "remover", "resumen", "romance", "ruidoso", "senales", "sincero", "sirenas", "sistema",
        "socorro", "suponer", "taxista", "tejidos", "tornero", "tragico", "vacante", "valores", "vengara", "volumen",
        "aprobar", "borrado", "cuidado", "dialogo", "entorno", "exponer", "festejo", "golpear", "hundido", "jornada",
        "lechuga", "llamado", "logrado", "mataron", "militar", "mirador", "negocio", "popular", "portero", "regalar"
    ],
    "8": [
        "mariposa", "tormenta", "cumplido", "comedias", "fabricar", "hormigas", "jubilado", "lavadora", "limonada", "lluvioso",
        "migrante", "molinero", "nacional", "ocupados", "ocurrira", "oficinas", "pancarta", "pariente", "pasteles", "peligros",
        "pizarron", "portales", "profesor", "promesas", "rechazar", "registro", "resumido", "rotacion", "saltando", "sardinas",
        "semillas", "sucumbir", "teclados", "temblaba", "tentando", "traducir", "unidades", "utilizar", "verduras", "vinilico",
        "visiones", "volcanes", "viajeros", "manzanas", "zapatero", "zigzague", "marcador", "mentiras", "disenado", "pinturas"
    ],
    "9": [
        "marioneta", "universos", "gasolinas", "caminando", "conmovera", "creciendo", "descubrir", "despacito", "dimension", "disculpar",
        "emocionar", "emociones", "esperanza", "estudiado", "fabulosos", "finalizar", "flamencos", "giratorio", "historias", "impostura",
        "invitando", "jugadores", "lamparita", "mandarina", "mantelito", "maravilla", "naturales", "numerosos", "obstaculo", "ocasiones",
        "pensiones", "persuadir", "profundos", "recordado", "regresado", "solicitud", "sorpresas", "suspender", "tranquila", "tradicion",
        "triunfado", "uniformes", "variacion", "verdadero", "vigilando", "viviendas", "volumenes", "zanahoria", "adorables", "concertar"
    ]
};

export const getRandomWordByLength = (length: number): string => {
    if (length <= 0) {
        throw new Error('La longitud de la palabra debe ser mayor a 0.');
    }
    const palabras: string[] | undefined = words[length.toString()];

    if (!palabras || palabras.length === 0) {
        throw new Error(`No hay palabras disponibles para la longitud de ${length} letras.`);
    }

    const randomIndex = Math.floor(Math.random() * palabras.length);
    return palabras[randomIndex].toUpperCase();
}

