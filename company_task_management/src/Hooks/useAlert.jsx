import { useDispatch } from "react-redux"
import Swal from "sweetalert2"

const useAlert = (deleteAction, successMessage) => {
  const dispatch = useDispatch()

  const handleDelete = async (id, error) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "custom-swal",
        title: "custom-swal-title",
        text: "custom-swal-text",
      },
    })

    if (result.isConfirmed) {
      try {
        await dispatch(deleteAction(id)).unwrap()
        await Swal.fire({
          title: "Deleted!",
          text: successMessage,
          icon: "success",
        })
        return true
      } catch (deleteError) {
        await Swal.fire({
          title: "Error!",
          text:
            deleteError || "You can't delete Poistion because detils is used.",
          icon: "error",
          confirmButtonColor: "#3f51b5",
        })
        return false
      }
    } else {
      return false
    }
  }

  return handleDelete
}

export default useAlert
