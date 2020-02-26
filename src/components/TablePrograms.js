import React, { useState } from 'react'
import { Header, Image, Table, Button, Modal, Icon } from 'semantic-ui-react'

const TablePrograms =({ programs, programForDescripton, handleShowDescription }) => {

  const [modalOpen, setModalOpen] = useState(false)

  const  handleOpen = () => setModalOpen(true)
  const  handleClose = () => setModalOpen(false)

  return (
    <Table basic='very' celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={2}>Channel</Table.HeaderCell>
          <Table.HeaderCell width={2}>Program name</Table.HeaderCell>
          <Table.HeaderCell width={2}>Date</Table.HeaderCell>
          <Table.HeaderCell width={2}>Strart time - end time</Table.HeaderCell>
          <Table.HeaderCell width={2}>Description</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {programs.map(program =>
          <Table.Row key={program.id}>
            <Table.Cell>

              <div style={{ display:'flex', flexWrap:'wrap', flexDirection:'row', alignItems:'center' }}><img src={program.logo} style={{ marginRight:'1em' }} alt='logo' /> <strong> {program.channel.name}</strong></div>

            </Table.Cell>
            <Table.Cell>{program.name}</Table.Cell>
            <Table.Cell>{program.startTime.slice(0,10)}</Table.Cell>
            <Table.Cell>{program.startTime.slice(10)} - {program.endTime.slice(10)}</Table.Cell>
            <Table.Cell>

              <Modal trigger={<Button  color='violet' onClick={() => {handleShowDescription(program.channel.id, program.id); handleOpen()}}>Show details</Button>}
                open={modalOpen}
                onClose={handleClose}
                size='small'>
                <Modal.Header style={{ display:'flex', flexWrap:'wrap', flexDirection:'row',justifyContent:'space-between' }}>
                Description
                  <Modal.Actions>
                    <Button color='red' onClick={handleClose} inverted>
                      <Icon name='close' /> Close
                    </Button>
                  </Modal.Actions>
                </Modal.Header>
                {programForDescripton?
                  <Modal.Content image>
                    <Image wrapped size='medium'  src={programForDescripton.thumbnails?programForDescripton.thumbnails[2].url:'https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png://cinemaone.net/images/movie_placeholder.png'}/>
                    <Modal.Description>
                      <Header>{programForDescripton.name}</Header>
                      <p>{programForDescripton.shortDescription}</p>
                      <p><strong>{programForDescripton.startTime.slice(10)} - {programForDescripton.endTime.slice(10)} Duration {programForDescripton.lengthMinutes} min</strong></p>
                      {programForDescripton.ageRating?<p style={{ color:'blue' }}><strong>Age rating: {programForDescripton.ageRating}</strong></p>:<></>}
                    </Modal.Description>
                  </Modal.Content>
                  :<></>}
              </Modal>

            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  )
}


export default TablePrograms