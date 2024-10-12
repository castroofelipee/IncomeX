import React, { useState, useEffect } from 'react';

function Home() {
    const [userName, setUserName] = useState('Fulano');
    const [incomeSources, setIncomeSources] = useState([]);
    const [debts, setDebts] = useState([]);
    const [reminder, setReminder] = useState('Não se esqueça de revisar suas metas financeiras para este mês.');
    const [debtors, setDebtors] = useState([]);

    useEffect(() => {
        // Simulação de carregamento dos dados
        setIncomeSources([
            { id: 1, source: 'Salário', amount: 3000, date: '2024-05-01' },
            { id: 2, source: 'Freelance', amount: 500, date: '2024-04-15' }
        ]);

        setDebts([
            { id: 1, description: 'Aluguel', amount: 800, dueDate: '2024-06-01' },
            { id: 2, description: 'Cartão de Crédito', amount: 450, dueDate: '2024-05-25' }
        ]);

        setDebtors([
            { id: 1, name: 'João', amount: 150, dueDate: '2024-05-15' },
            { id: 2, name: 'Maria', amount: 200, dueDate: '2024-06-10' }
        ]);
    }, []);

    return (
        <div className="container mx-auto p-4 sm:p-6 bg-gray-900 min-h-screen text-gray-100">
            {/* Identificação do Cliente */}
            <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Olá, {userName}</h1>

            {/* Fontes de Renda */}
            <div className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Fontes de Renda (últimos 6 meses)</h2>
                <ul className="space-y-2">
                    {incomeSources.map((income) => (
                        <li key={income.id} className="bg-gray-700 p-4 rounded-lg">
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                                <span>{income.source}</span>
                                <span className="font-medium">R$ {income.amount}</span>
                                <span className="text-gray-400">{new Date(income.date).toLocaleDateString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Ver todas as fontes de renda
                </button>
            </div>

            {/* Dívidas e Compromissos */}
            <div className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Dívidas e Compromissos (últimos 6 meses)</h2>
                <ul className="space-y-2">
                    {debts.map((debt) => (
                        <li key={debt.id} className="bg-gray-700 p-4 rounded-lg">
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                                <span>{debt.description}</span>
                                <span className="font-medium">R$ {debt.amount}</span>
                                <span className="text-gray-400">Vencimento: {new Date(debt.dueDate).toLocaleDateString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Ver todas as dívidas
                </button>
            </div>

            {/* Lembretes de Organização Financeira */}
            <div className="bg-yellow-800 text-yellow-200 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold">Lembretes</h2>
                <p>{reminder}</p>
            </div>

            {/* Valores a Receber */}
            <div className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Pessoas com Dívidas ou Valores a Receber</h2>
                <ul className="space-y-2">
                    {debtors.map((debtor) => (
                        <li key={debtor.id} className="bg-gray-700 p-4 rounded-lg">
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                                <span>{debtor.name}</span>
                                <span className="font-medium">R$ {debtor.amount}</span>
                                <span className="text-gray-400">Vencimento: {new Date(debtor.dueDate).toLocaleDateString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
