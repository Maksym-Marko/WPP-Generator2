import React, { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'
import { useSelector } from 'react-redux'
import { useUpdateTaskListMutation } from '@reactJs/services/TaskList'

const SaveTasks = () => {
    const tasks = useSelector((state) => state.taskList.tasks)
    const [unsavedChanges, setUnsavedChanges] = useState(false)
    const [updateTaskList, { isLoading: isUpdating }] = useUpdateTaskListMutation()

    useEffect(() => {
        setUnsavedChanges(true)
    }, [tasks])

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (unsavedChanges) {
                event.preventDefault()
                event.returnValue = ''
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [unsavedChanges])

    const saveTasksToDB = async () => {

        if (!Array.isArray(tasks)) {

            console.log(__('Something went wrong', 'wpp-generator-next'))
            return false
        }

        try {

            await updateTaskList({ taskItems: tasks })
            setUnsavedChanges(false)
        } catch (error) {

            console.error('Error saving task items:', error)
            return false
        }
    }

    return (
        <div className="mxsfwn-menu-item mxsfwn-save-tasks-area">
            <button className="mxsfwn-add-to-cart" onClick={saveTasksToDB}>
                {__('Save Tasks', 'wpp-generator-next')}
            </button>
        </div>
    )
}

export default SaveTasks
