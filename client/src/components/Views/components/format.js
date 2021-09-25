xport
default
function LibraryCards() {
    const [items, setItems] = useState([])
    const { loading, error, data } = useQuery(QUERY_ITEMS);


    useEffect(() => {
        if (data) {
            return setItems(data.Items)
        }
        if (loading) return `Loading. . .`
        if (error) return `Something went wrong. . .`
    })

    const classes = useStyles();

    //Note Dialog State
    const [open, setOpen] = useState(false);
    const [noteInfo, setNoteInfo] = useState({ name: '', item_id: '', content: '' })
    const [noteContent, setNoteContent] = useState('')
        // const [noteArgs, setNoteArgs] = useState({})

    // Get my viceList from localStorage
    const [vicebraryIDs, setVicebraryIDs] = useState(getSavedViceIDs())

    // Description or Note toggle
    const [selected, setSelected] = useState(false)

    // Mutations
    const [removeItem, { itemLoading, itemError }] = useMutation(REMOVE_ITEM);
    const [saveNote, { noteLoading, noteError }] = useMutation(SAVE_NOTE);
    // DialogueBox Open and Close
    const handleOpen = (e) => {
        // const itemID = e.currentTarget.value
        //console.log({itemID})
        setNoteInfo({
            name: e.currentTarget.name,
            item_id: e.currentTarget.value,
            content: e.currentTarget.content
        })
        setOpen(true);
        //console.table({noteInfo:noteInfo})
    }
    const handleClose = () => setOpen(false);

    const handleNoteToggle = (e) => {
        //console.log('NoteToggle:', e.currentTarget.selected)
        // e.currentTarget.selected = !e.currentTarget.selected

        e.currentTarget.selected = setSelected(!selected)

    }

    const handleNoteChange = (e) => {
        const content = e.currentTarget.value
        setNoteContent(content)
    }
    useEffect(() => setNoteInfo({ item_id: noteInfo.item_id, name: noteInfo.name, content: noteContent }), [noteContent])

    const handleSaveNote = async() => {
        //should be able to use spread operator, but not working or some reason
        setNoteInfo({ item_id: noteInfo, name: noteInfo.name, content: noteContent })
            //console.table(noteInfo)
        const { item_id, content } = noteInfo
        // console.log(`Note ITEM ID: ${item_id} \n Content: ${content}`)
        const token = Auth.loggedIn() ? Auth.getToken() : null
        if (!token) {
            return false;
        }

        try {
            const newNote = await saveNote({ variables: { item_id: item_id, content: content }, returnOriginal: false });
            console.dir({ newNote })
            if (noteLoading) {
                console.log(`Loading. . .`)
            }
            if (noteError) {
                throw new Error(`So, that shit didn't work`)
            }

            // setNoteInfo()
            setOpen(false);
            return newNote
        } catch (err) {
            throw err
        }
    }
    const handleRemoveFromVicebrary = async(v) => {
        const viceID = v.currentTarget.value

        const updatedViceIdArray = vicebraryIDs.filter((id) => id !== viceID)
            //console.log(`updatedViceIdArray = ${JSON.stringify(updatedViceIdArray)}`)
        const token = Auth.loggedIn() ? Auth.getToken() : null
        if (!token) {
            return false;
        }

        try {
            await removeItem({ variables: { vice_id: viceID } });
            //    console.log(viceID)
            if (itemLoading) {
                console.log(`Loading. . .`)
            }
            if (itemError) {
                throw new Error(`So, that shit didn't work`)
            }
            setVicebraryIDs(updatedViceIdArray)
            return updatedViceIdArray
        } catch (err) {
            throw err
        }

    }
    useEffect(() => {
        localSavedViceIDs(vicebraryIDs)
    })


    //console.table(vicebraryIDs)
    //console.table(items)
    let freshItems = items.filter((item) => vicebraryIDs.includes(item.vice_id))

    const itemCards = freshItems.map((item, index) => {

                if (!vicebraryIDs) {
                    return <Card >
                        <
                        span >
                        <
                        h2 style = {
                            { color: 'white' } } > You have not saved any vices yet, you saint. < /h2> <
                        /span> <
                        /Card>
                }
                if (item.vice[0].imgsrc === '') {
                    item.vice[0].imgsrc = 'https://loremflickr.com/g/320/240/wine,bottle'
                }