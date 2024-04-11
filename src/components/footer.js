import React from "react";

function Footer() {
  return (
    <div className="bg-gradient-to-t from-green-400 to-blue-600 p-4 text-white flex-shrink-0">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Como usar o Kanban Board!</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <li className="py-2">
            <strong>1. Adicione suas tarefas:</strong> Dentro de cada quadro, adicione cartões representando suas tarefas. Clique em "Criar Tarefas" para adicionar cartões.
          </li>
          <li className="py-2">
            <strong>2. Mova seus cartões:</strong> Arraste e solte os cartões entre os quadros para indicar o progresso de suas tarefas, de "A Fazer" para "Em Progresso" e depois para "Concluídas".
          </li>
          <li className="py-2">
            <strong>3. Coloque Datas Para suas Tarefas:</strong> Datas de vencimento e descrições detalhadas para organizar e priorizar suas tarefas.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
