import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from '../components/Machine/BackButton';
import MachineInfo from '../components/Machine/MachineInfo';
import ActionButtons from '../components/Machine/ActionButtons';
import EditMachineModal from '../components/Machine/EditMachineModal';
import StatusModal from '../components/Machine/StatusModal';
import MaintenanceModal from '../components/Machine/MaintenanceModal';

const MachineDetailsScreen = ({ navigation, route }: any) => {
  const { machine } = route.params;

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  
  const [status, setStatus] = useState(machine.status);
  const [comment, setComment] = useState('');

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <MachineInfo machine={machine} />
      <ActionButtons
        onEdit={() => setEditModalVisible(true)}
        onDelete={() => {}}
        onChangeStatus={() => setStatusModalVisible(true)}
        onShowMaintenance={() => setMaintenanceModalVisible(true)}
      />
      
      <EditMachineModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        machine={machine}
      />
      
      <StatusModal
        visible={statusModalVisible}
        onClose={() => setStatusModalVisible(false)}
        status={status}
        setStatus={setStatus}
        comment={comment}
        setComment={setComment}
      />
      
      <MaintenanceModal
        visible={maintenanceModalVisible}
        onClose={() => setMaintenanceModalVisible(false)}
        maintenanceData={machine.maintenanceReports}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default MachineDetailsScreen;