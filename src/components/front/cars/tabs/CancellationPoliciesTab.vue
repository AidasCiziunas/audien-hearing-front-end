<template>
  <div class="extra-include-list">
    <div v-if="car.details.cancellationPenalty.length != 0" class="mb-4">
      <h5>Cancellation Policy</h5>
      <p
        class="w-100"
        v-for="(term, tIndex) in car.details.cancellationPenalty"
        :key="tIndex"
      >
        {{
          term.text
        }}
      </p>
    </div>
    <h5>Policies Detail</h5>
    <ul
      v-for="(term, tIndex) in car.details.cancellationPolicies"
      :key="tIndex"
      class="d-block w-100"
      v-if="car.details.cancellationPolicies.length > 0"
    >
      {{
        term.Description[0]
      }}
      until
      <span v-if="term.DateTo == undefined">
        {{ getHotelCountryDFOnly(term.DateFrom) }}
      </span>

      <span v-if="term.DateFrom != undefined">
        {{ term.Description[1] }}

        {{ getHotelCountryDFOnly(term.DateFrom) }}
      </span>

      <span v-if="term.DateTo != undefined && term.DateTo != ''">
        - {{ getHotelCountryDFOnly(term.DateTo) }}
      </span>
    </ul>
    <ul class="d-block w-100">
      <li
        class="d-block w-100 ml-0"
        v-for="(term, tIndex) in car.details.terms"
        :key="tIndex"
      >
        <h5 style="display: block" v-if="term.Title != ''">
          {{ term.Title }}
        </h5>

        <span v-if=" Array.isArray(term.Content) == true">
          <!-- <p v-for="(con, cInd) in term.Content" :key="cInd" v-html="con"></p> -->
           <span class="mb-5" style="display: flex;flex-direction: column;" v-for="(con, cInd) in term.Content" :key="cInd" >
            <span v-for="(content,index) in term.Content" :key="'content'+index"> 
              <p v-if="typeof content == 'string' "> {{ content}}</p>
            </span>
             <p v-if="(con.name=='Credit Card' || con.name=='Debit Card') && con.minAge==undefined">{{con.name}}:</p>
             <p v-if="con.minAge!=undefined && (con.name !='Credit Card' || con.name !='Debit Card')">Min age:</p>
             <p v-if="con.description !=undefined">{{ con.description}}</p>
              <p v-if="con.ageGroupRestrictions !=undefined">Age Group Restrictions:</p> 
             <span v-if="con.ageGroupRestrictions !=undefined">
             <p  v-for="(restriction,index) in con.ageGroupRestrictions" :key="'restriction'+index">{{ restriction.description}}</p>
             </span>
             <p v-if="con.disclosure !=undefined">Disclosure:</p>
              <p v-if="con.disclosure !=undefined">{{con.disclosure}}</p>
              <p v-if="con.isAdditionalFeeRequired !=undefined">Additional Fee: {{con.isAdditionalFeeRequired?'Yes':'No'}}</p>
            
              <p v-if="con.supportedAtLocation !=undefined">Supported At location: {{con.supportedAtLocation?'Yes':'No'}}</p>
                                                    
                                                     
            </span>
        </span>

        <span v-else>
          <p  v-html="term.Content"></p>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CancellationPoliciesTab',
  props: ['car'],

  computed: {
    ...mapState({
      CType: (state) => state.envStore.CType,
      CSymbol: (state) => state.envStore.CSymbol,
      DFormat: (state) => state.envStore.DFormat,
      countryDF: (state) => state.envStore.countryDF,
      domain: (state) => state.envStore.domain,
      urlDomain: (state) => state.envStore.urlDomain,
    }),
  },

  mounted() {},
};
</script>

<style></style>
