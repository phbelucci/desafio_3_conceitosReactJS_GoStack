import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
        setRepositories(response.data)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "title": `Novo Projeto ${Date.now()}`,
      "url": `http://novaurl${Date.now()}`,
      "techs" : [`novatech1_${Date.now()}`, `novatech2_${Date.now()}`]
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`)

    setRepositories(repositories.filter(repository => repository.id !== id));
       
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
