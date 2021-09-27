
document.querySelector('.getInfo').addEventListener('click', getInformation)

// api keys
//'17f1a512f5msh0484ae90020d896p181746jsn18eb47e640ed'
//'1283f5daeemsh1c95751311bfd17p1cb2a1jsnd1b5c4ad61dc4'

//Global
axios.defaults.headers.common['x-rapidapi-key']='3d93e1ec0dmsh1ad5e49f4d7fea6p10c467jsnc54419b79424'
axios.defaults.headers.common['x-rapidapi-host']='imdb8.p.rapidapi.com'

function getInformation(){
    const movie= document.getElementById('name').value;
    document.getElementById('name').value='';
        axios.get(`https://imdb8.p.rapidapi.com/auto-complete?q=${movie}`)
        .then(res => {
            if (res.status===200){
                document.getElementById('status').innerHTML=`Your search results for <b>${movie}</b>:`
                document.querySelector('#output').innerHTML=''
                console.log(res)

                movies=res.data.d
                for(var i=0;i<5;i++){
                    search(movies[i])
                }
                // document.getElementById('more').style.display= block;
            }
        })            
        .catch(err => console.log(''));
    }

async function search(movie)
    {
        var card= '';
        card+= `
            <div class="movieCard card">
            <h3>${movie.l}</h3>
            <img src="${movie.i.imageUrl}"> 
            <p>Rank: ${movie.rank}<br>`
            x= await axios.get(`https://imdb8.p.rapidapi.com/title/get-ratings?tconst=${movie.id}`)
            .then(res=> {
                card+= `
            Rating: ${res.data.rating}/10<br>
            Rating count: ${res.data.ratingCount} <br>`
            
        });
        
        
        if(movie.q!=undefined){
            card+=`
            Type: ${movie.q}<br>`
        }
        if(movie.y!==undefined) {
            card+=`
            Year of Release: ${movie.y}<br>`
        }
        if(movie.s!==undefined) {
            card+=`
            Starring: ${movie.s}<br>`
        }
        card+=`</div>`
        document.querySelector('#output').innerHTML+= card;         
                 
    }       


