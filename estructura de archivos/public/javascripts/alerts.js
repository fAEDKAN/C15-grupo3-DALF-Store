let deleteForm = document.querySelector('#deleteForm')
                deleteForm.addEventListener('submit',(e)=>{
                    e.preventDefault()
                    Swal.fire({
                            title: "<h3 style='color:var(--C_Ice-Cream)'>Esta seguro que desea eliminar este producto?</h3>",
                            html:"<h5 style='color:var(--C_Ice-Cream)'>Esta accion no se puede revertir!</h5>",
                            icon: 'warning',
                            background:'var(--C_Dark)',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si, eliminar!',
                            customClass:{
                                icon:"alertIcon"
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    background:"var(--C_Dark)",
                                    title: "<h3 style='color:var(--C_Ice-Cream)'>Eliminado!</h3>",
                                    html:"<h5 style='color:var(--C_Ice-Cream)'>El producto fue eliminado con exito.</h5>",
                                    icon:"success"
                                })
                                deleteForm.submit()
                            }
                        })
                })