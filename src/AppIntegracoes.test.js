import React from 'react'
import { render, screen } from '@testing-library/react'

import api from './api'

import App from './App'

// faz uma simulação de chamada à API
jest.mock('./api')

describe('Requisições para API', () => {
	it('Exibir lista de transações através da API', async () => {
		// valor da promisse resolvida (simulação)
		api.listaTransacoes.mockResolvedValue([
			{
				valor: '10',
				transacao: 'saque',
				data: '10/08/2020',
				id: 1,
			},
			{
				transacao: 'deposito',
				valor: '20',
				data: '26/09/2020',
				id: '2',
			},
		])

		render(<App />)

		// algum elemento que só é renderizado depois de ter feito a chamada a API (teste)
		// findBy - retorna uma promisse, diferente do "getBy"
		expect(await screen.findByText('saque')).toBeInTheDocument()

		expect(screen.getByTestId('transacoes').children.length).toBe(2)
	})
})
