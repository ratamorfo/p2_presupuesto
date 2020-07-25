import React, { useState, useEffect } from 'react';

import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {
	//Definir states
	const [ presupuesto, guardarPresupuesto ] = useState(0);
	const [ restante, guardarRestante ] = useState(0);
	const [ mostrarpregunta, mostrarPregunta ] = useState(true);
	const [ gastos, guardarGastos ] = useState([]);
	const [ gasto, guardarGasto ] = useState({});
	const [ crearGasto, guardarCrearGasto ] = useState(false);

	// Use Effect
	useEffect(
		() => {
			if (crearGasto) {
				guardarGastos([ ...gastos, gasto ]);

				const presupuestoRestante = restante - gasto.cantidad;
				guardarRestante(presupuestoRestante);

				guardarCrearGasto(false);
			}
		},
		[ gasto, gastos, crearGasto, restante ]
	);

	return (
		<div className="container">
			<header>
				<h1>Gasto Semanal</h1>
				<div className="contenido-principal contenido">
					{
						mostrarpregunta ? <Pregunta
							guardarPresupuesto={guardarPresupuesto}
							guardarRestante={guardarRestante}
							mostrarPregunta={mostrarPregunta}
						/> :
						<div className="row">
							<div className="one-half column">
								<Formulario guardarGasto={guardarGasto} guardarCrearGasto={guardarCrearGasto} />
							</div>
							<div className="one-half column">
								<Listado gastos={gastos} />
								<ControlPresupuesto presupuesto={presupuesto} restante={restante} />
							</div>
						</div>}
				</div>
			</header>
		</div>
	);
}

export default App;
