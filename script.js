 function taskApp() {
      return {
        tasks: JSON.parse(localStorage.getItem('tasks')) || [],
        newTask: { title: '', description: '', status: 'À faire' },
        search: '',
        filter: '',
        editing: false,
        editData: {},
        editId: null,

        saveTasks() {
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },

        addTask() {
          if (!this.newTask.title.trim()) return;
          this.tasks.push({
            id: Date.now(),
            title: this.newTask.title,
            description: this.newTask.description,
            status: 'À faire'
          });
          this.saveTasks();
          this.newTask = { title: '', description: '', status: 'À faire' };
        },

        deleteTask(id) {
          if (confirm("Tu veux vraiment supprimer cette tâche ?")) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
          }
        },

        editTask(task) {
          this.editing = true;
          this.editId = task.id;
          this.editData = { ...task };
        },

        saveEdit() {
          const index = this.tasks.findIndex(t => t.id === this.editId);
          if (index !== -1) this.tasks[index] = { ...this.editData };
          this.saveTasks();
          this.editing = false;
        },

        cancelEdit() {
          this.editing = false;
        },

        filteredTasks() {
          return this.tasks.filter(t => {
            const matchStatus = this.filter ? t.status === this.filter : true;
            const matchSearch = t.title.toLowerCase().includes(this.search.toLowerCase());
            return matchStatus && matchSearch;
          });
        },

        countByStatus(status) {
          return this.tasks.filter(t => t.status === status).length;
        },
      }
    }
