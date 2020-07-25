import React, { useState } from 'react';
import Error from './Error';
import shortID from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {
	const [ nombre, guardarNombre ] = useState('');
	const [ cantidad, guardarCantidad ] = useState(0);
	const [ error, guardarError ] = useState(false);

	const agregarGasto = (e) => {
		e.preventDefault();

		// validar
		if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
			guardarError(true);
			return;
		}

		guardarError(false);

		// contruir gasto
		const gasto = {
			nombre,
			cantidad,
			id: shortID.generate()
		};

		// Pasar el gasto
		guardarGasto(gasto);
		guardarCrearGasto(true);

		// REINICIAR
		guardarNombre('');
		guardarCantidad(0);
	};

	return (
		<form onSubmit={agregarGasto}>
			<h2>Agrega tus gastos aquí</h2>
			{
				error ? <Error mensaje="Ambos campos son obligatorios y el presupuesto es incorrecto" /> :
				null}
			<div className="campo">
				<label>Nombre del gasto</label>
				<input
					type="text"
					className="u-full-width"
					placeholder="Ej. Transporte"
					value={nombre}
					onChange={(e) => guardarNombre(e.target.value)}
				/>
			</div>
			<div className="campo">
				<label>Cantidad del gasto</label>
				<input
					type="number"
					className="u-full-width"
					placeholder="Ej. 300"
					value={cantidad}
					onChange={(e) => guardarCantidad(parseInt(e.target.value))}
				/>
			</div>
			<input type="submit" className="button-primary u-full-width" value="Agregar Gasto" />
		</form>
	);
};

Formulario.propTypes = {
	guardarGasto: PropTypes.func.isRequired,
	guardarCrearGasto: PropTypes.func.isRequired
};

export default Formulario;
