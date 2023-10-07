
const closeBtn=document.getElementById('close-header-btn');

const openBtn=document.getElementById('open-header-btn');

const container=document.getElementById('header-container');

closeBtn?.addEventListener('click',(Event)=>{
    openBtn?.classList.toggle('hidden');

    container?.classList.toggle('hidden');    
});

openBtn?.addEventListener('click',(Event)=>{
    openBtn?.classList.toggle('hidden');

    container?.classList.toggle('hidden'); 
});