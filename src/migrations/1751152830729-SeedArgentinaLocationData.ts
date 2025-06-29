import { escapeSingleQuotes } from "src/utils/strings/escape.util";
import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid";

const argentinaData = {
	country: {
		name: "argentina",
		adm1: [
			{
				id: "0",
				name: "Buenos Aires",
				adm2: [
					{
						id: "1",
						name: "Tres Arroyos",
					},
					{
						id: "3",
						name: "Pinamar",
					},
					{
						id: "4",
						name: "General Pinto",
					},
					{
						id: "6",
						name: "General Juan Madariaga",
					},
					{
						id: "8",
						name: "Necochea",
					},
					{
						id: "9",
						name: "General Guido",
					},
					{
						id: "10",
						name: "Pergamino",
					},
					{
						id: "11",
						name: "José C. Paz",
					},
					{
						id: "14",
						name: "Diamante",
					},
					{
						id: "15",
						name: "Punta Indio",
					},
					{
						id: "16",
						name: "Coronel Suárez",
					},
					{
						id: "19",
						name: "Chascomús",
					},
					{
						id: "20",
						name: "Salliqueló",
					},
					{
						id: "24",
						name: "Paraná",
					},
					{
						id: "25",
						name: "Bahía Blanca",
					},
					{
						id: "27",
						name: "Saladillo",
					},
					{
						id: "28",
						name: "Victoria",
					},
					{
						id: "31",
						name: "Tornquist",
					},
					{
						id: "32",
						name: "Villa Gesell",
					},
					{
						id: "34",
						name: "San Cayetano",
					},
					{
						id: "37",
						name: "San Antonio de Areco",
					},
					{
						id: "41",
						name: "Rauch",
					},
					{
						id: "43",
						name: "General Alvarado",
					},
					{
						id: "44",
						name: "Islas del Ibicuy",
					},
					{
						id: "45",
						name: "Tandil",
					},
					{
						id: "46",
						name: "Concordia",
					},
					{
						id: "47",
						name: "Berazategui",
					},
					{
						id: "50",
						name: "Moreno",
					},
					{
						id: "51",
						name: "Lezama",
					},
					{
						id: "53",
						name: "La Costa",
					},
					{
						id: "54",
						name: "General Paz",
					},
					{
						id: "55",
						name: "Coronel Dorrego",
					},
					{
						id: "56",
						name: "Coronel Pringles",
					},
					{
						id: "57",
						name: "Rojas",
					},
					{
						id: "58",
						name: "Maipú",
					},
					{
						id: "59",
						name: "Magdalena",
					},
					{
						id: "60",
						name: "Uruguay",
					},
					{
						id: "62",
						name: "General Lavalle",
					},
					{
						id: "63",
						name: "General Pueyrredón",
					},
					{
						id: "65",
						name: "Gualeguaychú",
					},
					{
						id: "66",
						name: "Adolfo Gonzáles Chaves",
					},
					{
						id: "67",
						name: "Federal",
					},
					{
						id: "68",
						name: "Tigre",
					},
					{
						id: "70",
						name: "Escobar",
					},
					{
						id: "73",
						name: "Las Flores",
					},
					{
						id: "76",
						name: "Mar Chiquita",
					},
					{
						id: "77",
						name: "Carlos Casares",
					},
					{
						id: "83",
						name: "Puán",
					},
					{
						id: "85",
						name: "Trenque Lauquen",
					},
					{
						id: "86",
						name: "Guaminí",
					},
					{
						id: "92",
						name: "Ramallo",
					},
					{
						id: "98",
						name: "Cañuelas",
					},
					{
						id: "106",
						name: "Esteban Echeverría",
					},
					{
						id: "110",
						name: "Colón",
					},
					{
						id: "117",
						name: "Gualeguay",
					},
					{
						id: "125",
						name: "Carmen de Areco",
					},
					{
						id: "131",
						name: "Daireaux",
					},
					{
						id: "137",
						name: "Hipólito Yrigoyen",
					},
					{
						id: "140",
						name: "General Arenales",
					},
					{
						id: "143",
						name: "La Plata",
					},
					{
						id: "147",
						name: "Azul",
					},
					{
						id: "157",
						name: "Arrecifes",
					},
					{
						id: "158",
						name: "General Rodríguez",
					},
					{
						id: "173",
						name: "Tala",
					},
					{
						id: "183",
						name: "Mercedes",
					},
					{
						id: "192",
						name: "9 de Julio",
					},
					{
						id: "194",
						name: "Rivadavia",
					},
					{
						id: "196",
						name: "Tres Lomas",
					},
					{
						id: "202",
						name: "Luján",
					},
					{
						id: "227",
						name: "San Fernando",
					},
					{
						id: "230",
						name: "Pila",
					},
					{
						id: "233",
						name: "Roque Pérez",
					},
					{
						id: "234",
						name: "Chivilcoy",
					},
					{
						id: "235",
						name: "Ezeiza",
					},
					{
						id: "238",
						name: "Colón",
					},
					{
						id: "244",
						name: "Dolores",
					},
					{
						id: "249",
						name: "General La Madrid",
					},
					{
						id: "251",
						name: "Baradero",
					},
					{
						id: "253",
						name: "Almirante Brown",
					},
					{
						id: "262",
						name: "Lobos",
					},
					{
						id: "263",
						name: "Navarro",
					},
					{
						id: "269",
						name: "La Paz",
					},
					{
						id: "270",
						name: "Feliciano",
					},
					{
						id: "271",
						name: "Florencio Varela",
					},
					{
						id: "275",
						name: "Alberti",
					},
					{
						id: "280",
						name: "General Viamonte",
					},
					{
						id: "281",
						name: "Olavarría",
					},
					{
						id: "283",
						name: "Leandro N. Alem",
					},
					{
						id: "306",
						name: "San Vicente",
					},
					{
						id: "318",
						name: "Merlo",
					},
					{
						id: "326",
						name: "San Andrés de Giles",
					},
					{
						id: "328",
						name: "Malvinas Argentinas",
					},
					{
						id: "332",
						name: "Castelli",
					},
					{
						id: "340",
						name: "Exaltación de la Cruz",
					},
					{
						id: "341",
						name: "Brandsen",
					},
					{
						id: "359",
						name: "25 de Mayo",
					},
					{
						id: "361",
						name: "Laprida",
					},
					{
						id: "363",
						name: "Benito Juárez",
					},
					{
						id: "377",
						name: "Junín",
					},
					{
						id: "378",
						name: "Villaguay",
					},
					{
						id: "379",
						name: "Federación",
					},
					{
						id: "386",
						name: "San Nicolás",
					},
					{
						id: "403",
						name: "Coronel de Marina L. Rosales",
					},
					{
						id: "407",
						name: "Ensenada",
					},
					{
						id: "408",
						name: "Lincoln",
					},
					{
						id: "410",
						name: "Berisso",
					},
					{
						id: "411",
						name: "Pilar",
					},
					{
						id: "414",
						name: "Campana",
					},
					{
						id: "415",
						name: "General Villegas",
					},
					{
						id: "417",
						name: "General Belgrano",
					},
					{
						id: "421",
						name: "Pehuajó",
					},
					{
						id: "425",
						name: "Ayacucho",
					},
					{
						id: "438",
						name: "Adolfo Alsina",
					},
					{
						id: "439",
						name: "Tapalqué",
					},
					{
						id: "440",
						name: "Balcarce",
					},
					{
						id: "442",
						name: "Chacabuco",
					},
					{
						id: "444",
						name: "San Salvador",
					},
					{
						id: "453",
						name: "Nogoya",
					},
					{
						id: "456",
						name: "Bolívar",
					},
					{
						id: "461",
						name: "General Las Heras",
					},
					{
						id: "465",
						name: "Monte",
					},
					{
						id: "466",
						name: "Marcos Paz",
					},
					{
						id: "469",
						name: "General Alvear",
					},
					{
						id: "470",
						name: "Villarino",
					},
					{
						id: "477",
						name: "Bragado",
					},
					{
						id: "484",
						name: "Lobería",
					},
					{
						id: "488",
						name: "Saavedra",
					},
					{
						id: "490",
						name: "Patagones",
					},
					{
						id: "492",
						name: "Pellegrini",
					},
					{
						id: "493",
						name: "Capitán Sarmiento",
					},
					{
						id: "494",
						name: "Tordillo",
					},
					{
						id: "495",
						name: "Avellaneda",
					},
					{
						id: "497",
						name: "Monte Hermoso",
					},
					{
						id: "501",
						name: "Quilmes",
					},
					{
						id: "503",
						name: "Zárate",
					},
					{
						id: "510",
						name: "Florentino Ameghino",
					},
					{
						id: "512",
						name: "Presidente Perón",
					},
					{
						id: "514",
						name: "Carlos Tejedor",
					},
					{
						id: "520",
						name: "San Pedro",
					},
					{
						id: "523",
						name: "Suipacha",
					},
					{
						id: "524",
						name: "Salto",
					},
				],
			},
			{
				id: "1",
				name: "Catamarca",
				adm2: [
					{
						id: "12",
						name: "Santa María",
					},
					{
						id: "22",
						name: "Molinos",
					},
					{
						id: "108",
						name: "Tinogasta",
					},
					{
						id: "201",
						name: "Ancasti",
					},
					{
						id: "250",
						name: "Poman",
					},
					{
						id: "256",
						name: "Tafí del Valle",
					},
					{
						id: "264",
						name: "Capital",
					},
					{
						id: "290",
						name: "Paclin",
					},
					{
						id: "307",
						name: "Fray Mamerto Esquiú",
					},
					{
						id: "312",
						name: "Ambato",
					},
					{
						id: "323",
						name: "Andalgalá",
					},
					{
						id: "324",
						name: "Antofagasta de la Sierra",
					},
					{
						id: "350",
						name: "Santa Rosa",
					},
					{
						id: "380",
						name: "Capayán",
					},
					{
						id: "419",
						name: "El Alto",
					},
					{
						id: "433",
						name: "Belén",
					},
					{
						id: "447",
						name: "La Paz",
					},
					{
						id: "473",
						name: "Valle Viejo",
					},
				],
			},
			{
				id: "2",
				name: "Chaco",
				adm2: [
					{
						id: "36",
						name: "Tapenagá",
					},
					{
						id: "64",
						name: "Presidencia de la Plaza",
					},
					{
						id: "69",
						name: "Quitilipi",
					},
					{
						id: "71",
						name: "O'Higgins",
					},
					{
						id: "78",
						name: "Independencia",
					},
					{
						id: "96",
						name: "25 de Mayo",
					},
					{
						id: "101",
						name: "Sargento Cabral",
					},
					{
						id: "107",
						name: "Libertad",
					},
					{
						id: "121",
						name: "Maipú",
					},
					{
						id: "130",
						name: "9 de Julio",
					},
					{
						id: "135",
						name: "Libertador General San Martín",
					},
					{
						id: "156",
						name: "General Belgrano",
					},
					{
						id: "167",
						name: "Fray Justo Santa María de Oro",
					},
					{
						id: "187",
						name: "12 de Octubre",
					},
					{
						id: "191",
						name: "San Lorenzo",
					},
					{
						id: "197",
						name: "Bermejo",
					},
					{
						id: "266",
						name: "Comandante Fernández",
					},
					{
						id: "288",
						name: "General Güemes",
					},
					{
						id: "296",
						name: "Chacabuco",
					},
					{
						id: "299",
						name: "1ro. de Mayo",
					},
					{
						id: "369",
						name: "San Fernando",
					},
					{
						id: "374",
						name: "2 de Abril",
					},
					{
						id: "437",
						name: "General Donovan",
					},
					{
						id: "467",
						name: "Mayor Luis J. Fontana",
					},
				],
			},
			{
				id: "3",
				name: "Chubut",
				adm2: [
					{
						id: "82",
						name: "Gaiman",
					},
					{
						id: "93",
						name: "Tehuelches",
					},
					{
						id: "114",
						name: "Paso de los Indios",
					},
					{
						id: "116",
						name: "Río Senguer",
					},
					{
						id: "151",
						name: "Biedma",
					},
					{
						id: "166",
						name: "Languiñeo",
					},
					{
						id: "228",
						name: "Cushamen",
					},
					{
						id: "258",
						name: "Martires",
					},
					{
						id: "273",
						name: "Gastre",
					},
					{
						id: "298",
						name: "Telsen",
					},
					{
						id: "315",
						name: "Escalante",
					},
					{
						id: "333",
						name: "Futaleufú",
					},
					{
						id: "406",
						name: "Rawson",
					},
					{
						id: "460",
						name: "Florentino Ameghino",
					},
					{
						id: "502",
						name: "Sarmiento",
					},
				],
			},
			{
				id: "4",
				name: "Ciudad Autónoma de Buenos Aires",
				adm2: [
					{
						id: "40",
						name: "La Matanza",
					},
					{
						id: "49",
						name: "Vicente López",
					},
					{
						id: "84",
						name: "San Miguel",
					},
					{
						id: "94",
						name: "Comuna 11",
					},
					{
						id: "115",
						name: "Hurlingham",
					},
					{
						id: "180",
						name: "Comuna 9",
					},
					{
						id: "182",
						name: "Comuna 6",
					},
					{
						id: "217",
						name: "Comuna 8",
					},
					{
						id: "226",
						name: "Comuna 13",
					},
					{
						id: "285",
						name: "Lanús",
					},
					{
						id: "286",
						name: "Comuna 15",
					},
					{
						id: "293",
						name: "Tres de Febrero",
					},
					{
						id: "294",
						name: "San Isidro",
					},
					{
						id: "297",
						name: "Comuna 7",
					},
					{
						id: "329",
						name: "General San Martín",
					},
					{
						id: "334",
						name: "Comuna 1",
					},
					{
						id: "337",
						name: "Comuna 14",
					},
					{
						id: "339",
						name: "Ituzaingó",
					},
					{
						id: "368",
						name: "Comuna 2",
					},
					{
						id: "372",
						name: "Morón",
					},
					{
						id: "376",
						name: "Comuna 5",
					},
					{
						id: "402",
						name: "Comuna 3",
					},
					{
						id: "436",
						name: "Comuna 4",
					},
					{
						id: "458",
						name: "Comuna 10",
					},
					{
						id: "485",
						name: "Comuna 12",
					},
					{
						id: "513",
						name: "Lomas de Zamora",
					},
				],
			},
			{
				id: "5",
				name: "Córdoba",
				adm2: [
					{
						id: "75",
						name: "Rivadavia",
					},
					{
						id: "87",
						name: "Punilla",
					},
					{
						id: "103",
						name: "Colón",
					},
					{
						id: "104",
						name: "San Justo",
					},
					{
						id: "109",
						name: "Juárez Celman",
					},
					{
						id: "172",
						name: "Tercero Arriba",
					},
					{
						id: "199",
						name: "Río Seco",
					},
					{
						id: "205",
						name: "Río Cuarto",
					},
					{
						id: "207",
						name: "Ischilín",
					},
					{
						id: "211",
						name: "Tulumba",
					},
					{
						id: "247",
						name: "San Javier",
					},
					{
						id: "252",
						name: "Pocho",
					},
					{
						id: "268",
						name: "Calamuchita",
					},
					{
						id: "310",
						name: "Río Segundo",
					},
					{
						id: "351",
						name: "Totoral",
					},
					{
						id: "358",
						name: "General San Martín",
					},
					{
						id: "381",
						name: "Marcos Juárez",
					},
					{
						id: "383",
						name: "General Roca",
					},
					{
						id: "384",
						name: "Minas",
					},
					{
						id: "413",
						name: "Unión",
					},
					{
						id: "429",
						name: "Cruz del Eje",
					},
					{
						id: "431",
						name: "Sobremonte",
					},
					{
						id: "479",
						name: "Santa María",
					},
					{
						id: "482",
						name: "Capital",
					},
					{
						id: "491",
						name: "San Alberto",
					},
					{
						id: "500",
						name: "Presidente Roque Sáenz Peña",
					},
					{
						id: "516",
						name: "Río Primero",
					},
				],
			},
			{
				id: "6",
				name: "Corrientes",
				adm2: [
					{
						id: "81",
						name: "Santo Tomé",
					},
					{
						id: "99",
						name: "Curuzú Cuatiá",
					},
					{
						id: "100",
						name: "Ituzaingó",
					},
					{
						id: "112",
						name: "Concepción",
					},
					{
						id: "123",
						name: "Mburucuyá",
					},
					{
						id: "124",
						name: "Saladas",
					},
					{
						id: "134",
						name: "Paso de los Libres",
					},
					{
						id: "136",
						name: "Empedrado",
					},
					{
						id: "145",
						name: "General Alvear",
					},
					{
						id: "155",
						name: "San Martín",
					},
					{
						id: "177",
						name: "Mercedes",
					},
					{
						id: "208",
						name: "General Paz",
					},
					{
						id: "218",
						name: "San Roque",
					},
					{
						id: "219",
						name: "Berón de Astrada",
					},
					{
						id: "231",
						name: "San Miguel",
					},
					{
						id: "260",
						name: "Lavalle",
					},
					{
						id: "265",
						name: "Esquina",
					},
					{
						id: "267",
						name: "Bella Vista",
					},
					{
						id: "319",
						name: "San Cosme",
					},
					{
						id: "373",
						name: "Sauce",
					},
					{
						id: "394",
						name: "Capital",
					},
					{
						id: "420",
						name: "Itatí",
					},
					{
						id: "457",
						name: "Goya",
					},
					{
						id: "471",
						name: "Monte Caseros",
					},
				],
			},
			{
				id: "7",
				name: "Formosa",
				adm2: [
					{
						id: "97",
						name: "Ramón Lista",
					},
					{
						id: "105",
						name: "Laishi",
					},
					{
						id: "132",
						name: "Pirane",
					},
					{
						id: "154",
						name: "Pilagás",
					},
					{
						id: "311",
						name: "Bermejo",
					},
					{
						id: "336",
						name: "Pilcomayo",
					},
					{
						id: "347",
						name: "Formosa",
					},
					{
						id: "348",
						name: "Patiño",
					},
					{
						id: "404",
						name: "Matacos",
					},
				],
			},
			{
				id: "8",
				name: "Jujuy",
				adm2: [
					{
						id: "2",
						name: "El Carmen",
					},
					{
						id: "102",
						name: "Tumbaya",
					},
					{
						id: "118",
						name: "San Pedro",
					},
					{
						id: "174",
						name: "Ledesma",
					},
					{
						id: "178",
						name: "Palpalá",
					},
					{
						id: "215",
						name: "Valle Grande",
					},
					{
						id: "223",
						name: "San Antonio",
					},
					{
						id: "325",
						name: "Susques",
					},
					{
						id: "330",
						name: "Dr. Manuel Belgrano",
					},
					{
						id: "338",
						name: "Tilcara",
					},
					{
						id: "354",
						name: "Cochinoca",
					},
					{
						id: "393",
						name: "Yaví",
					},
					{
						id: "400",
						name: "Humahuaca",
					},
					{
						id: "434",
						name: "Santa Catalina",
					},
					{
						id: "472",
						name: "Rinconada",
					},
					{
						id: "522",
						name: "Santa Bárbara",
					},
				],
			},
			{
				id: "9",
				name: "La Pampa",
				adm2: [
					{
						id: "79",
						name: "Rancul",
					},
					{
						id: "119",
						name: "Caleu Caleu",
					},
					{
						id: "144",
						name: "Limay Mahuida",
					},
					{
						id: "153",
						name: "Conhelo",
					},
					{
						id: "175",
						name: "Atreuco",
					},
					{
						id: "184",
						name: "Chalileo",
					},
					{
						id: "220",
						name: "Maracó",
					},
					{
						id: "242",
						name: "Curacó",
					},
					{
						id: "248",
						name: "Lihuel Calel",
					},
					{
						id: "272",
						name: "Capital",
					},
					{
						id: "305",
						name: "Chical Có",
					},
					{
						id: "331",
						name: "Quemú Quemú",
					},
					{
						id: "342",
						name: "Realicó",
					},
					{
						id: "349",
						name: "Hucal",
					},
					{
						id: "371",
						name: "Utracán",
					},
					{
						id: "391",
						name: "Guatraché",
					},
					{
						id: "392",
						name: "Catriló",
					},
					{
						id: "395",
						name: "Puelén",
					},
					{
						id: "412",
						name: "Chapaleufú",
					},
					{
						id: "416",
						name: "Trenel",
					},
					{
						id: "463",
						name: "Toay",
					},
					{
						id: "476",
						name: "Loventué",
					},
				],
			},
			{
				id: "10",
				name: "La Roja",
				adm2: [
					{
						id: "0",
						name: "Arauco",
					},
					{
						id: "17",
						name: "Independencia",
					},
					{
						id: "18",
						name: "General Ocampo",
					},
					{
						id: "23",
						name: "Chamical",
					},
					{
						id: "80",
						name: "General Juan F.Quiroga",
					},
					{
						id: "111",
						name: "Capital",
					},
					{
						id: "126",
						name: "General Lamadrid",
					},
					{
						id: "165",
						name: "Castro Barros",
					},
					{
						id: "188",
						name: "Sanagasta",
					},
					{
						id: "284",
						name: "Rosario Vera Peñaloza",
					},
					{
						id: "287",
						name: "Coronel Felipe Varela",
					},
					{
						id: "291",
						name: "General Belgrano",
					},
					{
						id: "301",
						name: "San Blas de los Sauces",
					},
					{
						id: "343",
						name: "General Angel V. Peñaloza",
					},
					{
						id: "432",
						name: "General San Martín",
					},
					{
						id: "475",
						name: "Chilecito",
					},
					{
						id: "487",
						name: "Vinchina",
					},
					{
						id: "508",
						name: "Famatina",
					},
				],
			},
			{
				id: "11",
				name: "Mendoza",
				adm2: [
					{
						id: "7",
						name: "Santa Rosa",
					},
					{
						id: "26",
						name: "La Paz",
					},
					{
						id: "74",
						name: "Rivadavia",
					},
					{
						id: "90",
						name: "Guaymallén",
					},
					{
						id: "113",
						name: "Lavalle",
					},
					{
						id: "128",
						name: "San Martín",
					},
					{
						id: "213",
						name: "Tunuyán",
					},
					{
						id: "239",
						name: "General Alvear",
					},
					{
						id: "243",
						name: "Malargüe",
					},
					{
						id: "278",
						name: "Tupungato",
					},
					{
						id: "304",
						name: "Maipú",
					},
					{
						id: "314",
						name: "San Rafael",
					},
					{
						id: "316",
						name: "San Carlos",
					},
					{
						id: "344",
						name: "Las Heras",
					},
					{
						id: "397",
						name: "Luján de Cuyo",
					},
					{
						id: "435",
						name: "Junín",
					},
					{
						id: "455",
						name: "Godoy Cruz",
					},
					{
						id: "499",
						name: "Capital",
					},
				],
			},
			{
				id: "12",
				name: "Misiones",
				adm2: [
					{
						id: "5",
						name: "Montecarlo",
					},
					{
						id: "29",
						name: "El Dorado",
					},
					{
						id: "159",
						name: "Guaraní",
					},
					{
						id: "195",
						name: "Candelaria",
					},
					{
						id: "229",
						name: "San Ignacio",
					},
					{
						id: "241",
						name: "San Javier",
					},
					{
						id: "303",
						name: "San Pedro",
					},
					{
						id: "308",
						name: "Libertador General San Martín",
					},
					{
						id: "424",
						name: "General Manuel Belgrano",
					},
					{
						id: "426",
						name: "25 de Mayo",
					},
					{
						id: "430",
						name: "Apostoles",
					},
					{
						id: "449",
						name: "Cainguás",
					},
					{
						id: "451",
						name: "Leandro N. Alem",
					},
					{
						id: "452",
						name: "Concepción",
					},
					{
						id: "486",
						name: "Capital",
					},
					{
						id: "506",
						name: "Iguazú",
					},
					{
						id: "517",
						name: "Oberá",
					},
				],
			},
			{
				id: "13",
				name: "Neuquén",
				adm2: [
					{
						id: "91",
						name: "Catan Lil",
					},
					{
						id: "95",
						name: "Los Lagos",
					},
					{
						id: "120",
						name: "Collón Curá",
					},
					{
						id: "141",
						name: "Minas",
					},
					{
						id: "146",
						name: "Zapala",
					},
					{
						id: "148",
						name: "Aluminé",
					},
					{
						id: "204",
						name: "Huiliches",
					},
					{
						id: "214",
						name: "Ñorquín",
					},
					{
						id: "322",
						name: "Picún Leufú",
					},
					{
						id: "364",
						name: "Loncopué",
					},
					{
						id: "389",
						name: "Chos Malal",
					},
					{
						id: "390",
						name: "Confluencia",
					},
					{
						id: "423",
						name: "Picunches",
					},
					{
						id: "428",
						name: "Lacar",
					},
					{
						id: "450",
						name: "Anelo",
					},
					{
						id: "480",
						name: "Pehuenches",
					},
				],
			},
			{
				id: "14",
				name: "Río Negro",
				adm2: [
					{
						id: "133",
						name: "Bariloche",
					},
					{
						id: "138",
						name: "General Roca",
					},
					{
						id: "139",
						name: "Conesa",
					},
					{
						id: "209",
						name: "Pichi Mahuída",
					},
					{
						id: "222",
						name: "Ñorquinco",
					},
					{
						id: "302",
						name: "9 de Julio",
					},
					{
						id: "309",
						name: "Adolfo Alsina",
					},
					{
						id: "355",
						name: "Valcheta",
					},
					{
						id: "360",
						name: "Avellaneda",
					},
					{
						id: "405",
						name: "San Antonio",
					},
					{
						id: "418",
						name: "25 de Mayo",
					},
					{
						id: "468",
						name: "Pilnaniyeu",
					},
					{
						id: "511",
						name: "El Cuy",
					},
				],
			},
			{
				id: "15",
				name: "Salta",
				adm2: [
					{
						id: "35",
						name: "La Viña",
					},
					{
						id: "38",
						name: "San Carlos",
					},
					{
						id: "39",
						name: "Cachi",
					},
					{
						id: "42",
						name: "Chicoana",
					},
					{
						id: "48",
						name: "General Güemes",
					},
					{
						id: "52",
						name: "Metán",
					},
					{
						id: "127",
						name: "General José de San Martín",
					},
					{
						id: "168",
						name: "Capital",
					},
					{
						id: "171",
						name: "La Poma",
					},
					{
						id: "198",
						name: "Rosario de Lerma",
					},
					{
						id: "257",
						name: "Cerrillos",
					},
					{
						id: "279",
						name: "Orán",
					},
					{
						id: "282",
						name: "Rosario de la Frontera",
					},
					{
						id: "300",
						name: "La Candelaria",
					},
					{
						id: "387",
						name: "La Caldera",
					},
					{
						id: "388",
						name: "Santa Victoria",
					},
					{
						id: "445",
						name: "Anta",
					},
					{
						id: "459",
						name: "Guachipas",
					},
					{
						id: "496",
						name: "Rivadavia",
					},
					{
						id: "504",
						name: "Los Andes",
					},
					{
						id: "507",
						name: "Cafayate",
					},
					{
						id: "521",
						name: "Iruya",
					},
				],
			},
			{
				id: "16",
				name: "San Juan",
				adm2: [
					{
						id: "89",
						name: "Iglesia",
					},
					{
						id: "142",
						name: "Pocito",
					},
					{
						id: "152",
						name: "25 de Mayo",
					},
					{
						id: "164",
						name: "Calingasta",
					},
					{
						id: "176",
						name: "Rawson",
					},
					{
						id: "200",
						name: "Santa Lucía",
					},
					{
						id: "246",
						name: "Albardón",
					},
					{
						id: "274",
						name: "Angaco",
					},
					{
						id: "335",
						name: "Valle Fértil",
					},
					{
						id: "345",
						name: "Chimbas",
					},
					{
						id: "352",
						name: "San Martín",
					},
					{
						id: "353",
						name: "Rivadavia",
					},
					{
						id: "357",
						name: "Ullum",
					},
					{
						id: "362",
						name: "Caucete",
					},
					{
						id: "443",
						name: "9 de julio",
					},
					{
						id: "454",
						name: "Jáchal",
					},
					{
						id: "464",
						name: "Capital",
					},
					{
						id: "478",
						name: "Sarmiento",
					},
					{
						id: "489",
						name: "Zonda",
					},
				],
			},
			{
				id: "17",
				name: "San Luis",
				adm2: [
					{
						id: "30",
						name: "Gobernador Dupuy",
					},
					{
						id: "161",
						name: "Chacabuco",
					},
					{
						id: "189",
						name: "La Capital",
					},
					{
						id: "221",
						name: "Belgrano",
					},
					{
						id: "259",
						name: "Libertador General San Martín",
					},
					{
						id: "261",
						name: "Coronel Pringles",
					},
					{
						id: "366",
						name: "General Pedernera",
					},
					{
						id: "370",
						name: "Ayacucho",
					},
					{
						id: "518",
						name: "Junín",
					},
				],
			},
			{
				id: "18",
				name: "Santa Cruz",
				adm2: [
					{
						id: "150",
						name: "Lago Buenos Aires",
					},
					{
						id: "232",
						name: "Río Chico",
					},
					{
						id: "276",
						name: "Güer Aike",
					},
					{
						id: "327",
						name: "Deseado",
					},
					{
						id: "346",
						name: "Lago Argentino",
					},
					{
						id: "448",
						name: "Magallanes",
					},
					{
						id: "498",
						name: "Corpen Aike",
					},
				],
			},
			{
				id: "19",
				name: "Santa Fe",
				adm2: [
					{
						id: "149",
						name: "San Jerónimo",
					},
					{
						id: "160",
						name: "Las Colonias",
					},
					{
						id: "170",
						name: "9 de Julio",
					},
					{
						id: "181",
						name: "General Obligado",
					},
					{
						id: "185",
						name: "Caseros",
					},
					{
						id: "193",
						name: "San Justo",
					},
					{
						id: "206",
						name: "Garay",
					},
					{
						id: "210",
						name: "La Capital",
					},
					{
						id: "216",
						name: "Rosario",
					},
					{
						id: "236",
						name: "Constitución",
					},
					{
						id: "237",
						name: "San Cristobal",
					},
					{
						id: "245",
						name: "Iriondo",
					},
					{
						id: "255",
						name: "San Martín",
					},
					{
						id: "292",
						name: "Castellanos",
					},
					{
						id: "317",
						name: "Belgrano",
					},
					{
						id: "396",
						name: "San Lorenzo",
					},
					{
						id: "399",
						name: "Vera",
					},
					{
						id: "441",
						name: "San Javier",
					},
					{
						id: "474",
						name: "General López",
					},
				],
			},
			{
				id: "20",
				name: "Santiago del Estero",
				adm2: [
					{
						id: "13",
						name: "Choya",
					},
					{
						id: "21",
						name: "Alberdi",
					},
					{
						id: "33",
						name: "Ojo de agua",
					},
					{
						id: "61",
						name: "General Taboada",
					},
					{
						id: "72",
						name: "Juan F. Ibarra",
					},
					{
						id: "122",
						name: "Pelegrini",
					},
					{
						id: "162",
						name: "Guasayán",
					},
					{
						id: "163",
						name: "Avellaneda",
					},
					{
						id: "169",
						name: "Almirante Brown",
					},
					{
						id: "179",
						name: "Mitre",
					},
					{
						id: "186",
						name: "Río Hondo",
					},
					{
						id: "190",
						name: "Moreno",
					},
					{
						id: "203",
						name: "Jiménez",
					},
					{
						id: "212",
						name: "Robles",
					},
					{
						id: "225",
						name: "Figueroa",
					},
					{
						id: "254",
						name: "San Martín",
					},
					{
						id: "277",
						name: "Quebrachos",
					},
					{
						id: "313",
						name: "Salavina",
					},
					{
						id: "320",
						name: "Aguirre",
					},
					{
						id: "356",
						name: "Silípica",
					},
					{
						id: "367",
						name: "Atamisqui",
					},
					{
						id: "385",
						name: "Sarmiento",
					},
					{
						id: "409",
						name: "Loreto",
					},
					{
						id: "422",
						name: "Capital",
					},
					{
						id: "427",
						name: "Banda",
					},
					{
						id: "462",
						name: "Copo",
					},
					{
						id: "505",
						name: "Belgrano",
					},
				],
			},
			{
				id: "21",
				name: "Tierra del Fuego",
				adm2: [
					{
						id: "88",
						name: "Río Grande",
					},
					{
						id: "483",
						name: "Ushuaia",
					},
				],
			},
			{
				id: "22",
				name: "Tucumán",
				adm2: [
					{
						id: "129",
						name: "Graneros",
					},
					{
						id: "224",
						name: "Chicligasta",
					},
					{
						id: "240",
						name: "Burruyacú",
					},
					{
						id: "289",
						name: "Simoca",
					},
					{
						id: "295",
						name: "Capital",
					},
					{
						id: "321",
						name: "Lules",
					},
					{
						id: "365",
						name: "Cruz Alta",
					},
					{
						id: "375",
						name: "Monteros",
					},
					{
						id: "382",
						name: "Tafí Viejo",
					},
					{
						id: "398",
						name: "Trancas",
					},
					{
						id: "401",
						name: "Famallá",
					},
					{
						id: "446",
						name: "Río Chico",
					},
					{
						id: "481",
						name: "Leales",
					},
					{
						id: "509",
						name: "Yerba Buena",
					},
					{
						id: "515",
						name: "La Cocha",
					},
					{
						id: "519",
						name: "Juan B. Alberdi",
					},
				],
			},
		],
	},
};

export class SeedArgentinaLocationData1751152830729
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		const countryId = uuidv4();

		// Insertar país
		await queryRunner.query(`
            INSERT INTO countries (id, name) VALUES ('${countryId}', 'Argentina')
            `);

		// Insertar niveles
		await queryRunner.query(`
            INSERT INTO location_levels (id, [key], label_key, countryId) VALUES ('${uuidv4()}', 'province', 'location.argentina.province', '${countryId}')`);

		await queryRunner.query(`
            INSERT INTO location_levels (id, [key], label_key, countryId) VALUES ('${uuidv4()}', 'district', 'location.argentina.district', '${countryId}')`);

		// Insertar provincias
		for (const province of argentinaData.country.adm1) {
			const provinceId = uuidv4();

			await queryRunner.query(
				`INSERT INTO provinces (id, name, countryId) VALUES ('${provinceId}', '${escapeSingleQuotes(province.name)}', '${countryId}')`,
			);

			// Insertar partidos
			for (const district of province.adm2) {
				const districtId = uuidv4();

				await queryRunner.query(
					`INSERT INTO districts (id, name, provinceId) VALUES ('${districtId}', '${escapeSingleQuotes(district.name)}', '${provinceId}')`,
				);
			}
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// Obtener el ID del país Argentina
		const argentina = await queryRunner.query(`
		SELECT id FROM countries WHERE name = 'Argentina'
	`);
		const argentinaId = argentina?.[0]?.id;

		// Eliminar niveles
		await queryRunner.query(
			`DELETE FROM location_levels WHERE countryId = '${argentinaId}'`,
		);

		// Si no existe, no hacer nada
		if (!argentinaId) return;

		// Eliminar primero los districts (comunas/partidos)
		await queryRunner.query(`
		DELETE FROM districts
		WHERE provinceId IN (
			SELECT id FROM provinces WHERE countryId = '${argentinaId}'
		)
	`);

		// Luego las provincias
		await queryRunner.query(`
		DELETE FROM provinces WHERE countryId = '${argentinaId}'
	`);

		// Finalmente el país
		await queryRunner.query(`
		DELETE FROM countries WHERE id = '${argentinaId}'
	`);
	}
}
