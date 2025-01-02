export const ExampleDocsOpenApi = {
  successListApi: {
    succeeded: true,
    result: [
      {
        id: 'f536dbb8-154c-4c14-b4e7-d684cfe10c36',
        userId: '90f4c913-d5c4-4600-b7ea-06b7780f1cad',
        userName: 'Hernan Velasquez2',
        title: 'Test #1',
        description: 'Practica #1',
        limitDate: '2024-10-12T00:00:00.000Z',
        status: {
          value: 'To_do',
        },
      },
      {
        id: '9ca80ff0-a0c4-45c2-8cf3-cfd191e88b9f',
        userId: '',
        userName: '',
        title: 'Test #2',
        description: 'Practica #2',
        limitDate: '2024-10-12T00:00:00.000Z',
        status: {
          value: 'To_do',
        },
      },
    ],
  },
  successCreatedTask: {
    succeeded: true,
    result: {
      id: '9ca80ff0-a0c4-45c2-8cf3-cfd191e88b9f',
      userId: '',
      userName: '',
      title: 'Test #2',
      description: 'Practica #2',
      limitDate: '2024-10-12T00:00:00.000Z',
      status: {
        value: 'To_do',
      },
    },
  },
  successAssignTask: {
    succeeded: true,
    result: {
      id: 'f536dbb8-154c-4c14-b4e7-d684cfe10c36',
      userId: '90f4c913-d5c4-4600-b7ea-06b7780f1cad',
      userName: 'Hernan Velasquez2',
      title: 'Test #1',
      description: 'Practica #1',
      limitDate: '2024-10-12T00:00:00.000Z',
      status: {
        value: 'To_do',
      },
    },
    error: null,
  },

  successUpdateTask: {
    succeeded: true,
    result: {
      id: 'f536dbb8-154c-4c14-b4e7-d684cfe10c36',
      userId: '90f4c913-d5c4-4600-b7ea-06b7780f1cad',
      userName: 'Hernan Velasquez2',
      title: 'Implement a new feature',
      description: 'Practica #1',
      limitDate: '2024-10-12T00:00:00.000Z',
      status: {
        value: 'Done',
      },
    },
  },
  succeedDelete: {
    succeeded: true,
  },
};
