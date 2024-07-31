import { BiSolidEraser } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";

export function Table() {
    const itemsList = [
        { ambiente: "Sala 1", equipamento: "Computador", solicitacao: "Reparar", atendimento: "Em andamento"},
        { ambiente: "Sala 2", equipamento: "Projetor", solicitacao: "Trocar lâmpada", atendimento: "Concluído"},
        { ambiente: "Sala 3", equipamento: "Ar condicionado", solicitacao: "Limpeza", atendimento: "Pendente"},
        { ambiente: "Sala 3", equipamento: "Ar condicionado", solicitacao: "Limpeza", atendimento: "Pendente"},
        { ambiente: "Sala 3", equipamento: "Ar condicionado", solicitacao: "Limpeza", atendimento: "Pendente"},
        { ambiente: "Sala 3", equipamento: "Ar condicionado", solicitacao: "Limpeza", atendimento: "Pendente"},
        { ambiente: "Sala 3", equipamento: "Ar condicionado", solicitacao: "Limpeza", atendimento: "Pendente"},
        { ambiente: "Sala 3", equipamento: "Ar condicionado", solicitacao: "Limpeza", atendimento: "Pendente"},
    ];

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-center text-xs text-gray-600 uppercase tracking-wider">Ambiente</th>
                            <th scope="col" className="p-3 text-center text-xs text-gray-600 uppercase tracking-wider">Equipamento</th>
                            <th scope="col" className="p-3 text-center text-xs text-gray-600 uppercase tracking-wider">Solicitação</th>
                            <th scope="col" className="p-3 text-center text-xs text-gray-600 uppercase tracking-wider">Atendimento</th>
                            <th scope="col" className="p-3 text-center text-xs text-gray-600 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {itemsList.map((item, index) => (
                            <tr key={index}>
                                <td className="p-3 text-center whitespace-nowrap text-black">{item.ambiente}</td>
                                <td className="p-3 text-center whitespace-nowrap text-black">{item.equipamento}</td>
                                <td className="p-3 text-center whitespace-nowrap text-black">{item.solicitacao}</td>
                                <td className="p-3 text-center whitespace-nowrap text-black">{item.atendimento}</td>
                                <td className="p-3 text-center whitespace-nowrap text-black">
                                    <div className="flex justify-center items-center gap-x-2">
                                        <BiSolidEraser />
                                        <FaRegEdit />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
