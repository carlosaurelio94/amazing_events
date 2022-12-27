const { createApp } = Vue

createApp({
    data() {
        return {
            titulo: "",
            eventos: [],
            eventosFiltrados: [],
            categorias: [],
            eventosUpcoming: [],
            upcomingFiltrados: [],
            categoriasUpcoming: [],
            eventosPast: [],
            pastFiltrados: [],
            categoriasPast: [],
            filtroCategorias: [],
            urlApi: "https://amazing-events.herokuapp.com/api/events",
            search: "",
            precio: 0,
            id: new URLSearchParams(location.search).get("id"),
            buscar: ""
        }
    },
    created() {
/*         this.traerDatos(urlApi)
 */        
        data = data
        this.datosJs(data)
    },
    methods: {
        traerDatos(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.fechaActual = data.currentDate
                    this.eventos = data.events
                    this.eventosFiltrados = data.events
                    this.eventosUpcoming = data.events.filter(evento => evento.date > this.fechaActual)
                    this.upcomingFiltrados = data.events.filter(evento => evento.date > this.fechaActual)
                    this.eventosPast = data.events.filter(evento => evento.date < this.fechaActual)
                    this.pastFiltrados = data.events.filter(evento => evento.date < this.fechaActual)
                    this.eventos.forEach(evento => !this.categorias.includes(evento.category) ? this.categorias.push(evento.category) : "")
                    this.eventosUpcoming.forEach(evento => !this.categoriasUpcoming.includes(evento.category) ? this.categoriasUpcoming.push(evento.category) : "")
                    this.eventosPast.forEach(evento => !this.categoriasPast.includes(evento.category) ? this.categoriasPast.push(evento.category) : "")
                })
                .catch(error => console.log(error.message))
        },
        datosJs(info) {
            const Eventos = data
            this.fechaActual = Eventos.currentDate
            this.eventos = Eventos.events
            this.eventosFiltrados = Eventos.events
            this.eventosUpcoming = Eventos.events.filter(evento => evento.date > this.fechaActual)
            this.upcomingFiltrados = Eventos.events.filter(evento => evento.date > this.fechaActual)
            this.eventosPast = Eventos.events.filter(evento => evento.date < this.fechaActual)
            this.pastFiltrados = Eventos.events.filter(evento => evento.date < this.fechaActual)
            this.eventos.forEach(evento => !this.categorias.includes(evento.category) ? this.categorias.push(evento.category) : "")
            this.eventosUpcoming.forEach(evento => !this.categoriasUpcoming.includes(evento.category) ? this.categoriasUpcoming.push(evento.category) : "")
            this.eventosPast.forEach(evento => !this.categoriasPast.includes(evento.category) ? this.categoriasPast.push(evento.category) : "")
            console.log("hola");
        },
        modificarNumero(numero) {
            return new Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(numero);
        },
        espacio1() {
            let datos = this.eventos.map(evento => evento = { nombre: evento.name, percentage: evento.assistance * 100 / evento.capacity }).filter(evento => evento.percentage).sort((a, b) => a.percentage - b.percentage)
            return `${datos[datos.length - 1].nombre}: ${datos[datos.length - 1].percentage.toFixed(3)} %`
        },
        espacio2() {
            let datos = this.eventos.map(evento => evento = { nombre: evento.name, percentage: evento.assistance * 100 / evento.capacity }).filter(evento => evento.percentage).sort((a, b) => a.percentage - b.percentage)
            return `${datos[0].nombre}: ${datos[0].percentage.toFixed(3)} %`
        },
        espacio3() {
            let datos = this.eventos.map(evento => evento = { nombre: evento.name, capacidad: evento.capacity }).sort((a, b) => a.capacidad - b.capacidad)
            return `${datos[datos.length - 1].nombre}: ${this.modificarNumero(datos[datos.length - 1].capacidad)} people`
        },
        terminacionTabla(arrayEventos) {
            let categorias2 = []
            arrayEventos.map(evento => !categorias2.includes(evento.category) ? categorias2.push(evento.category) : "")
            console.log(arrayEventos);
            let arrayFinal = categorias2.map(elemento => {
                let fila;
                let ganancias = 0
                let asistencia = 0
                let capacidad = 0
                let porcentaje = 0
                let asistenciaLargo = []
                let nuevoObjeto = { categoria: "", gananciasTotales: 0, porcentajeTotal: 0 }

                arrayEventos.filter(evento => evento.category == elemento).forEach(ev => {
                    nuevoObjeto.categoria = elemento
                    ganancias = parseInt(ev.price) * parseInt(ev.assistance || ev.estimate)

                    nuevoObjeto.gananciasTotales += ganancias
                    console.log(nuevoObjeto.gananciasTotales)
                    asistenciaLargo.push(ev.assistance || ev.estimate)
                    asistencia += parseInt(ev.assistance || parseInt(ev.estimate))
                    capacidad += parseInt(ev.capacity)
                    porcentaje += (asistencia / capacidad) * 100
                    nuevoObjeto.porcentajeTotal = parseInt(porcentaje) / asistenciaLargo.length
                    fila = nuevoObjeto
                })

                console.log(fila)
                return fila
            })
            console.log(arrayFinal)
            console.log(arrayEventos);
            return arrayFinal
        },
       
    },
    computed: {
        filtroDoble() {
            let primerFiltro = this.eventosFiltrados.filter(evento => evento.name.toLowerCase().includes(this.search.toLowerCase()))
            if (this.filtroCategorias.length) {
                this.eventos = primerFiltro.filter(evento => this.filtroCategorias.includes(evento.category))
            } else {
                this.eventos = primerFiltro
            }
        },
        filtroDobleUpcoming() {
            let primerFiltro = this.upcomingFiltrados.filter(evento => evento.name.toLowerCase().includes(this.search.toLowerCase()))
            if (this.filtroCategorias.length) {
                this.eventosUpcoming = primerFiltro.filter(evento => this.filtroCategorias.includes(evento.category))
            } else {
                this.eventosUpcoming = primerFiltro
            }
        },
        filtroDoblePast() {
            let primerFiltro = this.pastFiltrados.filter(evento => evento.name.toLowerCase().includes(this.search.toLowerCase()))
            if (this.filtroCategorias.length) {
                this.eventosPast = primerFiltro.filter(evento => this.filtroCategorias.includes(evento.category))
            } else {
                this.eventosPast = primerFiltro
            }
        },
        contacto() {
            alert("We are checking your message. Thank you.")
        }
    },
}).mount("#app")


