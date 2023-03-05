import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from "../apis/RestaurantFinder"
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext)
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData(); 
    }, []);

    const handleDelete = async (e, id) => {
{/* IMPORTANT LESSON part2: using stopPropagation on the event allows the buttons on the row to work as intended */}
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id != id
            }))
        } catch(err) {
            console.log(err);
        }
    }

    const handleUpdate = (e, id) => {
{/* IMPORTANT LESSON part2: using stopPropagation on the event allows the buttons on the row to work as intended */}
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`);
    }

  return (
    <div className="list-group">
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map((restaurant) => {
{/* IMPORTANT LESSON part1: having an onClick handler for an entire row like this will effectively break/prevent the update/delete buttons from working */}
                    return (
                    <tr onClick={() => navigate(`/restaurants/${restaurant.id}`)} key={restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>reviews</td>
                        <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                        <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                    </tr>);                    
                })}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList