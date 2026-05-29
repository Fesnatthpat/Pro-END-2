<template>
  <div class="max-w-[1000px] mx-auto w-full py-8 px-4 ">

    <div class="text-center mb-10 pb-6 border-b border-gray-100">
      <h2 class="font-bold text-[30px] text-[#1a1a40] mb-2">
        <span class="material-symbols-rounded text-[#ffc107] mr-2">account_tree</span> ขั้นตอนการทำโครงงาน
      </h2>
      <p class="text-gray-500">คู่มือและลำดับขั้นตอนการดำเนินการโครงงานคอมพิวเตอร์ 2</p>
    </div>

    <div class="flex flex-col md:flex-row justify-center gap-3 mb-10">
      <button @click="activeTab = 'cp1'"
        :class="[ 'px-6 py-3.5 rounded-full font-bold transition-all duration-300 shadow-sm border-2',
          activeTab === 'cp1' ? 'bg-[#1a1a40] border-[#1a1a40] text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-[#1a1a40] hover:text-[#1a1a40]' ]">
        การสอบหัวข้อ (CP1)
      </button>

      <button @click="activeTab = 'cp2'"
        :class="[ 'px-6 py-3.5 rounded-full font-bold transition-all duration-300 shadow-sm border-2',
          activeTab === 'cp2' ? 'bg-[#1a1a40] border-[#1a1a40] text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-[#1a1a40] hover:text-[#1a1a40]' ]">
        การสอบโครงงาน (CP2)
      </button>

      <button @click="activeTab = 'change'"
        :class="[ 'px-6 py-3.5 rounded-full font-bold transition-all duration-300 shadow-sm border-2',
          activeTab === 'change' ? 'bg-[#1a1a40] border-[#1a1a40] text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-[#1a1a40] hover:text-[#1a1a40]' ]">
        การเปลี่ยนหัวข้อ
      </button>
    </div>

    <div class="bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-6 md:p-12 relative overflow-hidden">

      <div v-if="activeTab === 'cp1'" class="animate-fade-in flex flex-col items-center w-full">
        <h3 class="text-lg font-bold text-center text-gray-900 mb-8 border-b-2 border-gray-200 pb-2">
          ขั้นตอนการสอบหัวข้อโครงงานคอมพิวเตอร์ 2</h3>

        <div
          class="border-2 border-[#1a1a40] rounded-full px-10 py-3 font-bold bg-white text-center shadow-sm text-[#1a1a40]">
          เริ่มต้น</div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[600px] text-[#1a1a40] leading-relaxed">
          โหลดใบ CP 1 จาก Website<br><a href='https://link.bsru.ac.th/o20' target='_blank'
            class='text-blue-600 underline'>https://link.bsru.ac.th/o20</a>
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[600px] text-[#1a1a40] leading-relaxed">
          กรอกข้อมูลใน CP1 ให้เรียบร้อย<br>พร้อมลายเซ็นต์อาจารย์ที่ปรึกษาและอาจารย์ที่ปรึกษาร่วม
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[600px] text-[#1a1a40] leading-relaxed">
          ส่งใบ CP 1 ที่โต๊ะอาจารย์ ธีรพัฒน์ จันทร<br>ห้อง 412 (ห้องสาขา)
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[600px] text-[#1a1a40] leading-relaxed">
          รับทราบ วัน/เดือน/ปี/เวลา<br>จาก เบอร์โทรศัพท์, Line, E-mail
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[600px] text-[#1a1a40] leading-relaxed">
          สอบหัวข้อโครงงานคอมพิวเตอร์<br>ตามที่ วัน/เดือน/ปี/เวลา กำหนด
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div class="flex flex-col items-center w-full my-4 relative">
          <div class="relative w-[120px] h-[120px] flex items-center justify-center">
            <div class="absolute w-[85px] h-[85px] border-2 border-[#1a1a40] bg-white transform rotate-45 z-0"></div>
            <span class="relative z-10 font-bold text-[#1a1a40]">ผลพิจารณา</span>
          </div>

          <div class="flex flex-row justify-center items-start gap-12 mt-2 w-full relative">
            <div class="flex flex-col items-center w-1/2 relative">
              <div class="text-green-500 text-3xl transform rotate-[25deg] absolute -top-12 left-[calc(50%+40px)] z-0">↓
              </div>
              <div
                class="mt-2 border border-green-300 bg-green-50 text-green-800 p-3 rounded-lg text-sm font-bold text-center whitespace-nowrap min-w-[150px] relative z-10">
                อนุมัติหัวข้อโครงงาน
              </div>
            </div>
            <div class="flex flex-col items-center w-1/2 relative">
              <div class="text-red-500 text-3xl transform -rotate-[25deg] absolute -top-12 right-[calc(50%+40px)] z-0">↓
              </div>
              <div
                class="mt-2 border border-red-300 bg-red-50 text-red-800 p-3 rounded-lg text-sm font-bold text-center whitespace-nowrap min-w-[180px] relative z-10 overflow-hidden">
                <span class="inline-block min-w-full">ไม่อนุมัติหัวข้อ (ต้องกลับไปโหลดฟอร์มใหม่)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-gray-400 text-2xl my-2">↓</div>
        <div
          class="border-2 border-[#1a1a40] rounded-full px-10 py-3 font-bold bg-white text-center shadow-sm text-[#1a1a40]">
          จบกระบวนการ</div>
      </div>

      <div v-if="activeTab === 'cp2'" class="animate-fade-in flex flex-col items-center w-full">
        <h3 class="text-lg font-bold text-center text-gray-900 mb-8 border-b-2 border-gray-200 pb-2">
          ขั้นตอนการสอบโครงงานคอมพิวเตอร์ 2</h3>

        <div
          class="border-2 border-[#1a1a40] rounded-full px-12 py-3 font-bold bg-white text-center shadow-sm text-[#1a1a40]">
          เริ่มต้น</div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[650px] text-[#1a1a40] leading-relaxed">
          โหลดใบ CP2, CP3 จาก Website<br><a href='https://link.bsru.ac.th/o20' target='_blank'
            class='text-blue-600 underline'>https://link.bsru.ac.th/o20</a>
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[650px] text-[#1a1a40] leading-relaxed">
          กรอกข้อมูล ใน CP2, CP3 ให้ครบถ้วน พร้อมลายเซ็นต์อาจารย์ที่ปรึกษา<br>และอาจารย์ที่ปรึกษาร่วม
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[650px] text-[#1a1a40] leading-relaxed">
          ส่ง CP2, CP3 พร้อมเล่มสมบูรณ์ที่โต๊ะ ผศ.ดร.อมลณัฐ โชติกิจนุสรณ์<br>ห้อง 412 (ห้องสาขา)
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[650px] text-[#1a1a40] leading-relaxed">
          รับทราบ วัน/เดือน/ปี/เวลา สอบโครงงานคอมพิวเตอร์ ไม่เกิน 2 สัปดาห์<br>ผ่านทาง เบอร์โทรศัพท์, Line, E-mail
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div class="flex flex-col items-center w-full my-6 relative">
          <div class="relative flex items-center justify-center w-full">

            <div class="hidden lg:flex flex-row items-center absolute right-[calc(50%+60px)] z-20">
              <div
                class="border-2 border-[#1a1a40] px-6 py-4 font-medium bg-white text-left shadow-sm w-[350px] text-[#1a1a40] leading-relaxed">
                - พร้อมทราบประธานกรรมการสอบโครงงานคอมพิวเตอร์<br>- รับเล่มโครงงานคอมพิวเตอร์ ไม่เกิน 2 สัปดาห์
              </div>
              <div class="text-gray-400 text-3xl ml-3">←</div>
            </div>

            <div class="relative w-[120px] h-[120px] flex items-center justify-center z-10">
              <div class="absolute w-[85px] h-[85px] border-2 border-[#1a1a40] bg-white transform rotate-45 z-0"></div>
              <span class="relative z-10 font-bold text-[#1a1a40] text-center leading-tight">ผลการ<br>พิจารณา</span>
            </div>
          </div>

          <div class="lg:hidden flex flex-col items-center w-full mt-2">
            <div class="text-gray-400 text-2xl mb-1">↓</div>
            <div
              class="border-2 border-dashed border-gray-400 px-6 py-4 font-medium bg-gray-50 text-left w-full max-w-[650px] text-gray-700 leading-relaxed text-sm">
              <span class="font-bold text-[#1a1a40]">※ แจ้งให้ทราบ:</span><br>
              - พร้อมทราบประธานกรรมการสอบโครงงานคอมพิวเตอร์<br>- รับเล่มโครงงานคอมพิวเตอร์ ไม่เกิน 2 สัปดาห์
            </div>
          </div>
        </div>

        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[650px] text-[#1a1a40] leading-relaxed">
          - ส่งเล่มโครงงานคอมพิวเตอร์ให้ประธานกรรมการสอบโครงงาน<br>คอมพิวเตอร์ <span
            class="text-red-500 font-bold">(ต้องผ่าน)</span>
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[650px] text-[#1a1a40] leading-relaxed">
          - ส่งเล่มโครงงานคอมพิวเตอร์ให้ที่ปรึกษาร่วมโครงงานคอมพิวเตอร์<br><span
            class="text-red-500 font-bold">(ต้องผ่าน)</span>
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[650px] text-[#1a1a40] leading-relaxed">
          - ส่งเล่มโครงงานคอมพิวเตอร์ให้ที่ปรึกษาโครงงานคอมพิวเตอร์<br><span
            class="text-red-500 font-bold">(ต้องผ่าน)</span>
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[650px] text-[#1a1a40] leading-relaxed">
          - ส่งเล่มโครงงานคอมพิวเตอร์ให้ ผศ.ดร.อมลณัฐ โชติกิจนุสรณ์<br>ที่โต๊ะ ห้อง 412 (ห้องสาขา) <span
            class="text-red-500 font-bold">(ต้องผ่าน)</span>
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-left shadow-sm w-full max-w-[650px] text-[#1a1a40] leading-relaxed">
          - ส่งเล่มโครงงานคอมพิวเตอร์ (ฉบับสมบูรณ์) ให้ ผศ.ดร.อมลณัฐ<br>&nbsp;&nbsp;โชติกิจนุสรณ์ ห้อง 412
          (ห้องสาขา)<br>- รับทราบการเรียน ไม่เกิน 2 สัปดาห์ หลังจากส่งเล่มโครงงาน
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] rounded-full px-12 py-3 font-bold bg-white text-center shadow-sm text-[#1a1a40]">
          จบกระบวนการ</div>
      </div>

      <div v-if="activeTab === 'change'" class="animate-fade-in flex flex-col items-center w-full">
        <h3 class="text-lg font-bold text-center text-gray-900 mb-8 border-b-2 border-gray-200 pb-2">
          ขั้นตอนการเปลี่ยนหัวข้อโครงงานคอมพิวเตอร์ 2</h3>

        <div
          class="border-2 border-[#1a1a40] rounded-full px-10 py-3 font-bold bg-white text-center shadow-sm text-[#1a1a40]">
          เริ่มต้น</div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[600px] text-[#1a1a40] leading-relaxed">
          แจ้งเปลี่ยนหัวข้อต่ออาจารย์ที่ปรึกษา<br>และอาจารย์ที่ปรึกษาร่วม
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[600px] text-[#1a1a40] leading-relaxed">
          ดาวน์โหลดแบบฟอร์มจาก<br><a href='https://link.bsru.ac.th/o20' target='_blank'
            class='text-blue-600 underline'>https://link.bsru.ac.th/o20</a>
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[600px] text-[#1a1a40] leading-relaxed">
          กรอกข้อมูลให้เรียบร้อย<br>พร้อมลายเซ็นต์อาจารย์ที่ปรึกษาและอาจารย์ที่ปรึกษาร่วม
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] px-8 py-4 font-medium bg-white text-center shadow-sm w-full max-w-[600px] text-[#1a1a40] leading-relaxed">
          ส่งเอกสารบนโต๊ะ อ.ธีรพัฒน์ จันทร<br>ห้อง 412 (ห้องสาขา)
        </div>
        <div class="text-gray-400 text-2xl my-1">↓</div>

        <div
          class="border-2 border-[#1a1a40] rounded-full px-10 py-3 font-bold bg-white text-center shadow-sm text-[#1a1a40]">
          จบกระบวนการ</div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'student'
})

useHead({
  title: 'ขั้นตอนการทำโครงงาน'
})

const activeTab = ref('cp1')
</script>

<style scoped>
/* แอนิเมชันตอนสลับ Tab */
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>