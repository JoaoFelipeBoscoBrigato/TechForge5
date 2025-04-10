const produtos = [
    {
      id: 1,
      nome: "Camisa Flamengo 2023",
      preco: 249.90,
      descricao: "Camisa oficial do Flamengo temporada 2023",
      time: "Flamengo"
    },
    {
        id: 2,
        nome: "Camisa Brasil 2022",
        preco: 279.90,
        descricao: "Camisa oficial do Brasil temporada 2023",
        time: "Brasil"
      },
      {
        id: 3,
        nome: "Camisa Barcelona 2023",
        preco: 299.90,
        descricao: "Camisa oficial do Barcelona temporada 2023",
        time: "Bracelona"
      },
      {
        id: 1,
        nome: "Camisa Real Madrid 2023",
        preco: 299.90,
        descricao: "Camisa oficial do Real Madrid temporada 2023",
        time: "Real Madrid"
      },
  ];
  
  module.exports = {
    findAll: () => produtos,
    findById: (id) => produtos.find(p => p.id === id)
  };