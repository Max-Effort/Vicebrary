import Add from './Add'
import Search from './Search'
import Home from './Home'
import Library from './Library'

export default function View(page) {

    let view = page.page;
    // Get State from Footer through Main and render appropriate component  
    if (view === "home") {
        return <Home /> ;
    }
    if (view === "library") {
        return <Library />;
    }
    if (view === "search") {
        return <Search /> ;
    }
    if (view === "add") {
        return <Add /> ;
    }




}