const venue ={
    prices:{ 
        premium: 60,
        standard: 40,
        economy: 25
    },
    sections:[
        {name: 'Premium',
        type: 'premium',
        rows:['A', 'B', 'C', 'D', 'E'],
        seats: 14
        },
        {name: 'Standard',
        type: 'standard',
        rows:['F', 'G', 'H', 'I', 'J'],
        seats: 20
        },
        {name: 'Economy',
        type: 'economy',
        rows:['K', 'L', 'M', 'N', 'O'],
        seats: 30
        }
    ],
    unavailable: ['A3','A4','B7','C1','C10','D5','E2','F1','F2','G3','H4','I5','J6','K7','L8','M9','N10','O11']
}