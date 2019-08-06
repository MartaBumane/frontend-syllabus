class Video{
    constructor(name, rating){
        this.name = name;
        this.rating = rating;
        this.user = null;
        this.ratingCount = 1;
    }
     addRating(rating){
        this.ratingCount ++;
        this.rating = (this.rating + rating)/this.ratingCount;
     }
    get print(){
        if (this.isRented){
            return '['+this.name + ']';
        }else return this.name;
    }

    rent(user){
        this.user = user;
    }
    get isRented(){
        return this.user!==null;
    }

    return(){
        this.user = null;
    }
}

class VideoStore{
    constructor(){
        this.movies = [];
    }

    addMovie(name, rating){
        this.movies.push(new Video(name, rating));
    }

    get printContent(){
        return this.movies.map(m=> m.print).join(',');

    }

    get asChoices(){
        let moviesAsChoices = this.movies
        .filter(movie=>movie.isRented===false)
        .map(movie=>({ name: movie.print, value: movie }));
        return moviesAsChoices;
    }
  
    rentMovies(movies, user){
        for(const movie of movies){

            movie.rent(user);
        }
    }

    returnMovie(movie){
        movie.return();
    }

    moviesToReturnAsChoises(user){
        return this.movies
        .filter(movie=>movie.user === user)
        .map(movie=>({ name: movie.print, value: movie }));

    }
}

exports.VideoStore = VideoStore;

