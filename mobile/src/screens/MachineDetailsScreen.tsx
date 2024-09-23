import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from '../components/Maintenance/BackButton';
import MachineInfo from '../components/Maintenance/MachineInfo';
import ActionButtons from '../components/Maintenance/ActionButtons';
import EditMachineModal from '../components/Maintenance/EditMachineModal';
import StatusModal from '../components/Maintenance/StatusModal';
import MaintenanceModal from '../components/Maintenance/MaintenanceModal';

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