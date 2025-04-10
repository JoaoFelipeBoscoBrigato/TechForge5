export const fetchProtectedData = async () => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/protected-route`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
  
    return response.json();
  };