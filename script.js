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
        seats: 16
        },
        {name: 'Economy',
        type: 'economy',
        rows:['K', 'L', 'M', 'N', 'O'],
        seats: 18
        }
    ],
    unavailable: ['A3','A4','B7','C1','C10','D5','E2','F1','F2','G3','H4','I5','J6','K7','L8','M9','N10','O11']
};

const seats={};
const map = document.getElementById('map');

function buildMap(){
    const stage = document.createElement('div');
    stage.className = 'stage';
    stage.textContent = 'STAGE';
    map.appendChild(stage);

    venue.sections.forEach(section => {
        const title = document.createElement('div');
        title.className = 'section-title';
        title.textContent = section.name+' - $'+venue.prices[section.type];
        map.appendChild(title);

        section.rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'row';
            rowDiv.innerHTML = '<span class ="row-label">'+ row+ '</span>';

            for (let n=1 ; n<=section.seats; n++){
                const id= row+n;
                seats[id]={
                    id: id,
                    row: row,
                    number: n,
                    section: section.name,
                    type: section.type,
                    price: venue.prices[section.type]
                };
                const btn = document.createElement('button');
                btn.className = 'seat '+ section.type;
                btn.id='seat-'+id;
                btn.textContent=n;
                rowDiv.appendChild(btn);
            }
            map.appendChild(rowDiv);
        });
    });   
}
buildMap();