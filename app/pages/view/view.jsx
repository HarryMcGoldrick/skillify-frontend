import React, { useEffect, useState } from 'react';
import GraphList from '../../components/graph-list';
import { getGraphIds } from '../../services/graph-service';

export default function View() {
  return (
    <GraphList graphIds />
  );
}
