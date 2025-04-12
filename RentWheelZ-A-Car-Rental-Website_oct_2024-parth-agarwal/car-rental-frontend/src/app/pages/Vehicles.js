// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../../styles/vehicles.css';
// import BookingModal from '../../components/BookingModal';
// import { useAuth } from '../AuthContext';
// import Vehicle from './Vehicle';

// const Vehicles = () => {
//     const [vehicles, setVehicles] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filters, setFilters] = useState({
//         type: '',
//         capacity: '',
//         price: ''
//     });
//     const [isBookOpen, setIsBookOpen] = useState(false);
//     const [vehicleId, setVehicleId] = useState(null);
//     const [company, setCompany] = useState(null);
//     const [model, setModel] = useState(null);

//     const [vehicle, setVehicle] = useState(null);

    
//     const [expandReviewFor, setExpandReviewFor] = useState(-1);
//     const [reviews, setReviews] = useState([]);

//     const [isVehicleOpen, setIsVehicleOpen] = useState(false);

//     const fetchReviews = async (vehicleId) => {
//         try{
//             const response = await axios.get(`http://localhost:8081/api/reviews/vehicle/${vehicleId}`, {
//                 params: {
//                     token: jwtToken,
//                 }
//             });
//             setReviews(response.data);
//         }
//         catch (error) { 
//             console.error("Error fetching reviews:", error);
//         }
//     }



//     const handleExpandReviews = async (vehicleId) => {
//         // Fetch reviews for the vehicle at https://localhost:8081/api/reviews/vehicle/:vehicleId
//         // add them to the reviews state
//         // set expandReviewFor to vehicleId after fetching reviews if it's -1
//         // set setExpandReviewFor to -1 if it already was not -1.
//         try {
//             if (expandReviewFor === vehicleId) {
//                 // If already expanded, collapse it by setting expandReviewFor to -1
//                 setExpandReviewFor(-1);
//                 setReviews([]);
//             } else {
//                 fetchReviews(vehicleId);
//                 // Set expandReviewFor to the vehicleId to expand the reviews
//                 setExpandReviewFor(vehicleId);
//             }
//         } catch (error) {
//             console.error("Error fetching reviews:", error);
//         }
//     }
    
//     const { jwtToken, userId } = useAuth();

//     const handleBooking = async (vehicleId, vehicleCompany, vehicleModel) => {
//         console.log('Booking vehicle ', vehicleCompany , ' ', vehicleModel);
//         setVehicleId(vehicleId);
//         setCompany(vehicleCompany);
//         setModel(vehicleModel);
//         setIsBookOpen(true);
//     }


//     useEffect(() => {
//         const fetchVehicles = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8081/api/vehicles/all`, {
//                     params: {
//                         token: jwtToken,
//                     }
//                 });
//                 console.log(response.data);
//                 setVehicles(response.data);
//             } catch (error) {
//                 console.error('Error fetching vehicles:', error);
//             }
//         };

//         fetchVehicles();
//     }, []);

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };



//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters((prevFilters) => ({
//             ...prevFilters,
//             [name]: value,
//         }));
//     };

//     const filteredVehicles = vehicles.filter(vehicle => {
//         const searchMatch = vehicle.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());

//         return (
//             searchMatch &&
//             (filters.type ? vehicle.type === filters.type : true) &&
//             (filters.capacity ? vehicle.capacity === parseInt(filters.capacity) : true) &&
//             (filters.price ? vehicle.pricePerDay <= parseInt(filters.price) : true)
//         );
//     });

//     return (

//         <div className='vehicleContainer'>
//             {isVehicleOpen && <Vehicle vehicle={vehicle} close={()=>setIsVehicleOpen(false)}/>}
//             {isBookOpen && (
//                 <BookingModal 
//                     onClose={() => setIsBookOpen(false)} 
//                     userId={userId} 
//                     vehicleId={vehicleId} 
//                     company={company} 
//                     model={model}
//                 />
//             )}
        
//             <h1>Vehicles</h1>
//             <div className="filterVehicle">
//                 <input
//                     type="text"
//                     placeholder="Search by company or model name"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                 />
//                 <select name="type" onChange={handleFilterChange}>
//                     <option value="">Select Type</option>
//                     <option value="Sedan">Sedan</option>
//                     <option value="SUV">SUV</option>
//                     <option value="Hatchback">Hatchback</option>
//                     <option value="Electric">Electric</option>
//                 </select>

//                 <select name="capacity" onChange={handleFilterChange}>
//                     <option value="">Select Capacity</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                     <option value="6">6</option>
//                     <option value="7">7</option>
//                 </select>

//                 <select name="price" onChange={handleFilterChange}>
//                     <option value="">Select Max Price</option>
//                     <option value="1000">1000</option>
//                     <option value="1500">1500</option>
//                     <option value="2000">2000</option>
//                     <option value="2500">2500</option>
//                     <option value="3000">3000</option>
//                     <option value="3500">3500</option>
//                 </select>
//             </div>

//             <ul>
//                 {filteredVehicles.map(vehicle => (
//                     <div key={vehicle.id} >

//                     <li className="vehicleItem">
//                         <div className="vehicleLeft">
//                         <img src={vehicle.imageUrl} alt={vehicle.model} width="100" />
//                         <h2>{vehicle.companyName} {vehicle.model}</h2>
//                         </div>
//                         <div className="vehicleRight">
//                         <div className="vehicleDetail"> 
//                             <p>Type: {vehicle.type}</p>
//                             <p>Capacity: {vehicle.capacity}</p>
//                             <p>Price per Day: ${vehicle.pricePerDay}</p>
//                             <p>Manufacturing Year: {vehicle.manufacturingYear}</p>
//                             <p>Rating: {vehicle.rating}</p>
//                             <p>Number Plate: {vehicle.numberPlate}</p>
//                         </div>
//                         <div className="buttonContainer">
//                             <button onClick={()=>{setVehicle(vehicle);setIsVehicleOpen(true);}}>open vehicle</button>
//                             <button className="vehicleBtn" onClick={() => handleBooking(vehicle.id, vehicle.companyName, vehicle.model)}>Book</button>
//                             <button className="vehicleBtn" onClick={() => handleExpandReviews(vehicle.id)}>Show/Hide Reviews</button>
//                         </div>
//                         </div>
//                     </li>
//                     {expandReviewFor==vehicle.id? (
//                         <div className="reviews">
//                             {reviews.length>0 && reviews.map(review => (
//                                 <div key={review.id} className='review'>
//                                     <p>Rating: {review.rating}</p>
//                                     <p>Comment: {review.comment}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     ):null}
//                     </div>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Vehicles;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/vehicles.css';
import BookingModal from '../../components/BookingModal';
import { useAuth } from '../AuthContext';
import Vehicle from './Vehicle';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        type: '',
        capacity: '',
        price: ''
    });
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [vehicleId, setVehicleId] = useState(null);
    const [company, setCompany] = useState(null);
    const [model, setModel] = useState(null);

    const [vehicle, setVehicle] = useState(null);

    
    const [expandReviewFor, setExpandReviewFor] = useState(-1);
    const [reviews, setReviews] = useState([]);

    const [isVehicleOpen, setIsVehicleOpen] = useState(false);

    const fetchReviews = async (vehicleId) => {
        try{
            const response = await axios.get(`http://localhost:8081/api/reviews/vehicle/${vehicleId}`, {
                params: {
                    token: jwtToken,
                }
            });
            setReviews(response.data);
        }
        catch (error) { 
            console.error("Error fetching reviews:", error);
        }
    }



    const handleExpandReviews = async (vehicleId) => {
        // Fetch reviews for the vehicle at https://localhost:8081/api/reviews/vehicle/:vehicleId
        // add them to the reviews state
        // set expandReviewFor to vehicleId after fetching reviews if it's -1
        // set setExpandReviewFor to -1 if it already was not -1.
        try {
            if (expandReviewFor === vehicleId) {
                // If already expanded, collapse it by setting expandReviewFor to -1
                setExpandReviewFor(-1);
                setReviews([]);
            } else {
                fetchReviews(vehicleId);
                // Set expandReviewFor to the vehicleId to expand the reviews
                setExpandReviewFor(vehicleId);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }
    
    const { jwtToken, userId } = useAuth();

    const handleBooking = async (vehicleId, vehicleCompany, vehicleModel) => {
        console.log('Booking vehicle ', vehicleCompany , ' ', vehicleModel);
        setVehicleId(vehicleId);
        setCompany(vehicleCompany);
        setModel(vehicleModel);
        setIsBookOpen(true);
    }


    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/vehicles/all`, {
                    params: {
                        token: jwtToken,
                    }
                });
                console.log(response.data);
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };



    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredVehicles = vehicles.filter(vehicle => {
        const searchMatch = vehicle.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());

        return (
            searchMatch &&
            (filters.type ? vehicle.type === filters.type : true) &&
            (filters.capacity ? vehicle.capacity === parseInt(filters.capacity) : true) &&
            (filters.price ? vehicle.pricePerDay <= parseInt(filters.price) : true)
        );
    });

    return (

        <div className='vehicleContainer'>
            {isVehicleOpen ? (<Vehicle vehicle={vehicle} close={()=>setIsVehicleOpen(false)}/>) :
             (<>
        
            <h1>Vehicles</h1>
            <div className="filterVehicle">
                <input
                    type="text"
                    placeholder="Search by company or model name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select name="type" onChange={handleFilterChange}>
                    <option value="">Select Type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Electric">Electric</option>
                </select>

                <select name="capacity" onChange={handleFilterChange}>
                    <option value="">Select Capacity</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>

                <select name="price" onChange={handleFilterChange}>
                    <option value="">Select Max Price</option>
                    <option value="1000">1000</option>
                    <option value="1500">1500</option>
                    <option value="2000">2000</option>
                    <option value="2500">2500</option>
                    <option value="3000">3000</option>
                    <option value="3500">3500</option>
                </select>
            </div>

            <ul>
                {filteredVehicles.map(vehicle => (
                    <li key={vehicle.id} onClick={()=>{setVehicle(vehicle);setIsVehicleOpen(true);}} className="vehicleItem">
                        <img src={vehicle.imageUrl} alt={vehicle.model} width="100" />
                        <h2>{vehicle.companyName} {vehicle.model}</h2>
                    </li>
                ))}
            </ul>
            </>)}
        </div>
    );
};

export default Vehicles;
