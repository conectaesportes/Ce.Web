const arenas = [
    {
    //     "nome": "Club Arena Premium",
    //     "slug": "cuite-pb-club-arena-premium",
    //     "logo": 'data:image/jpeg;base64,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',
    //     "descricao": "Temos quadras de areia e society!",
    //     "endereco": {
    //         "rua": "Rua 7 de Setembro",
    //         "numero": "422",
    //         "bairro": "Das Graças",
    //         "cidade": "Cuité",
    //         "estado": "PB",
    //         "cep": "58175-000",
    //         "complemento": "",
    //         "coordenadas": [-6.483702412501147,-36.1672624671057],
    //     },
    //     "horarioFuncionamento": [
    //         {
    //             'dia': 'Saturday',
    //             'horaAbertura': '08:00:00',
    //             'horaFechamento': '22:00:00'
    //         },
    //         {
    //             'dia': 'Sunday',
    //             'horaAbertura': '08:00:00',
    //             'horaFechamento': '22:00:00'
    //         }
    //     ],
    //     "contatos": [
    //         {
    //             "phone": "83999999999"
    //         }
    //     ],
    //     "areasDeJogo": [
    //         {
    //             "id": 1,
    //             "nome": "Quadra de Areia 1",
    //             "imgLink": "https://saocarlosclube.com.br/images/2021/08_AGOSTO/NOTICIAS/2509_notcia.jpg",
    //             "Descricao": "",
    //             "Tipo": "Areia",
    //             "precoPorHora": 40.0,
    //         },
    //         {
    //             "id": 2,
    //             "nome": "Quadra de Areia 2",
    //             "imgLink": "https://saocarlosclube.com.br/images/2021/08_AGOSTO/NOTICIAS/2509_notcia.jpg",
    //             "Descricao": "",
    //             "Tipo": "Areia",
    //             "precoPorHora": 40.0,
    //         },
    //     ]
    // },
    // {
        "nome": "Pé nA'reia Beach Club",
        "slug": "cuite-pb-pe-nareia-beach-club",
        'logo': 'data:image/png;base64,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',
        "descricao": "Temos quadras de areia e society!",
        "endereco": {
            "rua": "Rua 7 de Setembro",
            "numero": "422",
            "bairro": "Das Graças",
            "cidade": "Cuité",
            "estado": "PB",
            "cep": "58175-000",
            "complemento": "",
            "coordenadas": [-6.480512558073373,-36.147614313633476],
        },
        "horarioFuncionamento": [
            {
                'dia': 'Saturday',
                'horaAbertura': '08:00:00',
                'horaFechamento': '22:00:00'
            },
            {
                'dia': 'Sunday',
                'horaAbertura': '08:00:00',
                'horaFechamento': '22:00:00'
            }
        ],
        "contatos": [
            {
                "phone": "83999999999"
            }
        ],
        "areasDeJogo": [
            {
                "id": 1,
                "nome": "Quadra de Areia 1",
                "imgLink": "https://saocarlosclube.com.br/images/2021/08_AGOSTO/NOTICIAS/2509_notcia.jpg",
                "Descricao": "",
                "Tipo": "Areia",
                "precoPorHora": 40.0,
            },
            {
                "id": 2,
                "nome": "Quadra de Areia 2",
                "imgLink": "https://saocarlosclube.com.br/images/2021/08_AGOSTO/NOTICIAS/2509_notcia.jpg",
                "Descricao": "",
                "Tipo": "Areia",
                "precoPorHora": 40.0,
            },
            {   
                "id": 3,
                "nome": "Quadra de Areia 3",
                "imgLink": "https://saocarlosclube.com.br/images/2021/08_AGOSTO/NOTICIAS/2509_notcia.jpg",
                "Descricao": "",
                "Tipo": "Areia",
                "precoPorHora": 40.0,
            },
            {   
                "id": 4,
                "nome": "Quadra de Areia 4",
                "imgLink": "https://saocarlosclube.com.br/images/2021/08_AGOSTO/NOTICIAS/2509_notcia.jpg",
                "Descricao": "",
                "Tipo": "Areia",
                "precoPorHora": 40.0,
            },
            {
                "id": 5,
                "nome": "Quadra de Areia 5",
                "imgLink": "https://saocarlosclube.com.br/images/2021/08_AGOSTO/NOTICIAS/2509_notcia.jpg",
                "Descricao": "",
                "Tipo": "Areia",
                "precoPorHora": 40.0,
            },
            {
                "id": 6,
                "nome": "Quadra de Areia 6",
                "imgLink": "https://saocarlosclube.com.br/images/2021/08_AGOSTO/NOTICIAS/2509_notcia.jpg",
                "Descricao": "",
                "Tipo": "Areia",
                "precoPorHora": 40.0,
            },
        ]
    }
];

export default arenas;