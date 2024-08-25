import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import './DisplayProject.css'
import api from '../../config/api';

function DisplayProject() {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data.data); 
                setFilteredProjects(response.data.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []); 

    useEffect(() => {
        handleSearch();
    }, [searchQuery, projects, selectedStatus]);

    const handleSearch = () => {
        let filtered = projects.filter((project) =>
            project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        if (selectedStatus) {
            filtered = filtered.filter(project => 
                project.projectStatus.toUpperCase() === selectedStatus.toUpperCase()
            );
        }
    
        setFilteredProjects(filtered);
    };
    

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    return (
        <div className='project-display-component'>
            <div className="search-filter-container">
                <input
                    type="text"
                    placeholder="Search by project name ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="project-search-input"
                />
                <select 
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="filter-button"
                >
                    <option value="">Filter by Status</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="ON_HOLD">On Hold</option>
                </select>
            </div>
            <div className="projects-grid">
                {Array.isArray(projects) && projects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <ProjectCard key={project.projectId} project={project} />
                    ))
                ) : (
                    <p> Loading... </p>
                )}
            </div>
        </div>
    );
}

export default DisplayProject;
