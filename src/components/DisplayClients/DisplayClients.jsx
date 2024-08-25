import React, { useState, useEffect } from 'react';
import ClientRow from './ClientRow';
import './DisplayClients.css';
import api from '../../config/api';

function DisplayClients({ openModal }) {
    const [clients, setClients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);

    const fetchClients = async () => {
        try {
            const response = await api.get('/clients');
            setClients(response.data.data);
            setFilteredClients(response.data.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);


    useEffect(() => {
        handleSearch();
    }, [searchQuery, clients]);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = clients.filter(client =>
            client.companyName.toLowerCase().includes(query) ||
            client.pointOfContact.toLowerCase().includes(query) 
        );
        setFilteredClients(filtered);
    };

    

    return (
        <>
            <div className="client-display-component">
                <div className="client-search-container">
                    <input
                        type="text"
                        placeholder="Search by company name or contact ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        id="client-search-input"
                    />
                </div>
                <div className="clients-container">
                    {Array.isArray(clients) && clients.length > 0 ? (
                        filteredClients.map((client) => <ClientRow key={client.clientId} client={client} openModal={openModal} />)
                    ) : (
                        <p>No clients available.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default DisplayClients;
