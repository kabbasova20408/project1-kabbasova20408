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
const viewport =document.querySelector('.viewport');
let scale = 1, x=0, y=0;
let inspected=null;

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
                    price: venue.prices[section.type],
                    unavailable: venue.unavailable.includes(id)
                };
                const btn = document.createElement('button');
                btn.className = 'seat '+ section.type;
                btn.id='seat-'+id;
                btn.textContent=n;
                btn.addEventListener('click',()=>inspect(id));
                rowDiv.appendChild(btn);
            }
            map.appendChild(rowDiv);
        });
    });   
}

function updateSeat(id){
    const btn = document.getElementById('seat-'+id);
    btn.classList.toggle('unavailable',seats[id].unavailable);
    btn.classList.toggle('inspected',id===inspected);
}
function inspect(id){
    const old=inspected;
    inspected=id;
    if(old) updateSeat(old);
    updateSeat(id);
    showDetails()
}
function showDetails(){
    const s= seats[inspected];
    const addBtn = document.getElementById('addBtn');
    let status = 'Available';
    if (s.unavailable) status='Unavailable';

    document.getElementById('details').innerHTML='<p><strong>'+s.section+ '</strong><br>Row '+s.row+", Seat "+s.number+
    '<br>Price: $'+s.price+'<br>Status: '+status+'</p>'
    addBtn.disabled=status!=='Available';

}

function applyView(){
    scale= Math.min(2.5,Math.max(0.5,scale));
    map.style.transform = 'translate('+x+'px, '+y+'px) scale('+scale+')';
}
function zoomAt(delta,px,py){
    const oldScale=scale;
    scale = Math.min(2.5,Math.max(0.5,scale+delta));
    x=px-(px-x)*(scale/oldScale);
    y=py-(py-y)*(scale/oldScale);
    applyView();
}

document.getElementById('zoomIn').onclick = () => zoomAt(0.25,viewport.clientWidth/2, viewport.clientHeight/2);
document.getElementById('zoomOut').onclick = () => zoomAt(-0.25,viewport.clientWidth/2, viewport.clientHeight/2);
document.getElementById('up').onclick = ()=>{y+=60;applyView();};
document.getElementById('down').onclick = ()=>{y-=60;applyView();};
document.getElementById('left').onclick = ()=>{x+=60;applyView();};
document.getElementById('right').onclick = ()=>{x-=60;applyView();};
buildMap();
Object.keys(seats).forEach(updateSeat);