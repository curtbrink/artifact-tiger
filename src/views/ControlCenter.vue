<template>
  <v-container class="px-16">
    <v-row align="center" justify="center">
      <v-col cols="6">
        <ShipStatusCard />
      </v-col>
      <v-col cols="6">
        <ShipActionsCard />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <ShipInventoryCard />
      </v-col>
      <v-col cols="6">
        <ShipEquipmentCard />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import ShipStatusCard from '@/components/control-center/ShipStatusCard.vue';
import ShipInventoryCard from '@/components/control-center/ShipInventoryCard.vue';
import ShipActionsCard from '@/components/control-center/ShipActionsCard.vue';
import ShipEquipmentCard from '@/components/control-center/ShipEquipmentCard.vue';
</script>
