<template>
  <div class="min-h-screen bg-slate-50/50 dark:bg-slate-900 py-10 px-4 md:px-8 text-slate-800 dark:text-slate-200 font-sans">
    <div v-if="user" class="max-w-[1100px] mx-auto w-full">
      
      <div class="mb-6">
        <NuxtLink to="/student" class="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-800 px-5 py-2.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 transition-all text-sm font-bold w-fit hover:-translate-x-1 hover:shadow-md">
          <span class="material-symbols-rounded text-lg">arrow_back</span> ย้อนกลับไปหน้าหลัก
        </NuxtLink>
      </div>

      <div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 class="text-slate-900 dark:text-white tracking-tight flex items-center gap-3 text-3xl md:text-4xl font-black">
            <div class="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center">
              <span class="material-symbols-rounded text-2xl">person</span>
            </div>
            ข้อมูลส่วนตัว
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-2 ml-1 font-medium">จัดการข้อมูลส่วนตัว ข้อมูลติดต่อ และที่อยู่ของคุณ</p>
        </div>
        <button @click="isEditing = !isEditing" 
                :class="isEditing ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 border-rose-200 dark:border-rose-500/30' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none border-transparent'"
                class="px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 w-fit border">
          <span class="material-symbols-rounded">{{ isEditing ? 'close' : 'edit_document' }}</span>
          {{ isEditing ? 'ยกเลิกการแก้ไข' : 'แก้ไขข้อมูลส่วนตัว' }}
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Column: Profile Card & Project Info -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Profile Card -->
          <div class="bg-white dark:bg-slate-800 rounded-[32px] p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            
            <div class="relative w-28 h-28 mx-auto mb-5">
              <div v-if="user.profileImage" class="w-full h-full rounded-full border-4 border-white dark:border-slate-700 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img :src="user.profileImage" alt="Profile" class="w-full h-full object-cover">
              </div>
              <div v-else class="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-indigo-600 dark:text-indigo-300 rounded-full flex items-center justify-center text-4xl font-black border-4 border-white dark:border-slate-700 shadow-lg group-hover:scale-105 transition-transform duration-300">
                {{ user.fullname?.substring(0, 1) }}
              </div>
              <div class="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-800 shadow-sm flex items-center justify-center">
                <span class="material-symbols-rounded text-white text-[14px]">check</span>
              </div>
            </div>

            <h3 class="text-xl md:text-2xl text-slate-900 dark:text-white mb-1 font-black">{{ user.fullname }}</h3>
            <p class="text-indigo-500 dark:text-indigo-400 font-bold mb-6 tracking-wide">{{ user.username }}</p>
            
            <div class="inline-flex items-center justify-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 px-5 py-2 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700">
              <span class="material-symbols-rounded text-lg text-emerald-500">verified_user</span>
              <span>สถานะ: นักศึกษาปัจจุบัน</span>
            </div>
          </div>

          <!-- Project Card -->
          <div class="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden">
            <span class="material-symbols-rounded absolute -right-6 -bottom-6 text-8xl text-indigo-500/20 rotate-12">dashboard</span>
            <h4 class="text-xs font-black text-indigo-300 mb-3 uppercase tracking-widest flex items-center gap-2">
              <span class="material-symbols-rounded text-sm">work</span> โครงงานของฉัน
            </h4>
            <p class="text-lg font-bold leading-snug mb-6 text-white">
              {{ project?.titleTh || 'ยังไม่ได้ยื่นเสนอหัวข้อโครงงาน' }}
            </p>
            
            <div v-if="project" class="space-y-5 pt-5 border-t border-indigo-800/50">
              <div>
                <div class="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-2">สมาชิกในกลุ่ม</div>
                <div class="space-y-2">
                  <div class="text-sm text-indigo-50 flex items-center gap-2.5 bg-indigo-900/50 px-3 py-2 rounded-xl">
                    <div class="w-6 h-6 rounded-full bg-indigo-800 flex items-center justify-center text-xs"><span class="material-symbols-rounded text-[14px]">person</span></div>
                    <span class="font-medium">{{ project.student1?.fullname }}</span>
                  </div>
                  <div v-if="project.student2" class="text-sm text-indigo-50 flex items-center gap-2.5 bg-indigo-900/50 px-3 py-2 rounded-xl">
                    <div class="w-6 h-6 rounded-full bg-indigo-800 flex items-center justify-center text-xs"><span class="material-symbols-rounded text-[14px]">person</span></div>
                    <span class="font-medium">{{ project.student2?.fullname }}</span>
                  </div>
                </div>
              </div>

              <div>
                <div class="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-2">อาจารย์ที่ปรึกษา</div>
                <div class="space-y-2">
                  <div class="text-sm text-indigo-50 flex items-center gap-2.5 bg-indigo-900/50 px-3 py-2 rounded-xl">
                    <div class="w-6 h-6 rounded-full bg-purple-900 flex items-center justify-center text-xs"><span class="material-symbols-rounded text-[14px] text-purple-300">school</span></div>
                    <span class="font-medium">{{ project.advisor?.fullname || '-' }}</span>
                  </div>
                  <div v-if="project.coAdvisor" class="text-sm text-indigo-50 flex items-center gap-2.5 bg-indigo-900/50 px-3 py-2 rounded-xl">
                    <div class="w-6 h-6 rounded-full bg-purple-900/50 flex items-center justify-center text-xs"><span class="material-symbols-rounded text-[14px] text-purple-300">school</span></div>
                    <span class="font-medium">{{ project.coAdvisor?.fullname }}</span>
                    <span class="text-[10px] bg-purple-800 text-purple-200 px-1.5 py-0.5 rounded font-bold ml-auto">ที่ปรึกษาร่วม</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="bg-indigo-900/50 p-4 rounded-2xl border border-indigo-800/50 flex items-center gap-3">
              <span class="material-symbols-rounded text-indigo-400 text-2xl">info</span>
              <span class="text-sm text-indigo-200 font-medium">คุณยังไม่มีข้อมูลโครงงานในระบบ</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Forms -->
        <div class="lg:col-span-8 space-y-6">
          <div class="bg-white dark:bg-slate-800 rounded-[32px] p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-700">
            
            <div class="mb-8 pb-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h4 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <span class="material-symbols-rounded">id_card</span>
                </div>
                ข้อมูลส่วนตัว (Personal Info)
              </h4>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">ชื่อ-นามสกุล</label>
                <input type="text" v-model="user.fullname" :disabled="!isEditing" 
                       :class="isEditing ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-900/50 border-transparent text-slate-700 dark:text-slate-300'"
                       class="w-full border text-sm font-semibold rounded-2xl px-5 py-3.5 outline-none transition-all placeholder-slate-300">
              </div>
              <div>
                <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">รหัสนักศึกษา</label>
                <div class="relative">
                  <input type="text" v-model="user.username" disabled 
                         class="bg-slate-50 dark:bg-slate-900/50 border-transparent text-slate-500 dark:text-slate-400 w-full border text-sm font-semibold rounded-2xl px-5 py-3.5 outline-none">
                  <span class="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 text-lg">lock</span>
                </div>
              </div>
            </div>

            <div class="mt-10 mb-8 pb-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h4 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <span class="material-symbols-rounded">contact_phone</span>
                </div>
                ข้อมูลการติดต่อ (Contact Info)
              </h4>
            </div>

            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">เบอร์โทรศัพท์มือถือ</label>
                  <div class="relative group">
                    <span class="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2" :class="isEditing ? 'text-indigo-500' : 'text-slate-400'">phone_iphone</span>
                    <input type="text" v-model="user.tel" :disabled="!isEditing" 
                           :class="isEditing ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-900/50 border-transparent text-slate-700 dark:text-slate-300'"
                           class="w-full border text-sm font-semibold rounded-2xl pl-12 pr-5 py-3.5 outline-none transition-all placeholder-slate-300">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">อีเมล (Email)</label>
                  <div class="relative group">
                    <span class="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2" :class="isEditing ? 'text-indigo-500' : 'text-slate-400'">alternate_email</span>
                    <input type="email" v-model="user.email" :disabled="!isEditing" 
                           :class="isEditing ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-900/50 border-transparent text-slate-700 dark:text-slate-300'"
                           class="w-full border text-sm font-semibold rounded-2xl pl-12 pr-5 py-3.5 outline-none transition-all placeholder-slate-300">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">LINE ID</label>
                  <div class="relative group">
                    <span class="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2" :class="isEditing ? 'text-indigo-500' : 'text-slate-400'">chat</span>
                    <input type="text" v-model="user.lineId" :disabled="!isEditing" 
                           :class="isEditing ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-900/50 border-transparent text-slate-700 dark:text-slate-300'"
                           class="w-full border text-sm font-semibold rounded-2xl pl-12 pr-5 py-3.5 outline-none transition-all placeholder-slate-300">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">โทรศัพท์บ้าน (ถ้ามี)</label>
                  <div class="relative group">
                    <span class="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2" :class="isEditing ? 'text-indigo-500' : 'text-slate-400'">call</span>
                    <input type="text" v-model="user.homePhone" :disabled="!isEditing" 
                           :class="isEditing ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-900/50 border-transparent text-slate-700 dark:text-slate-300'"
                           class="w-full border text-sm font-semibold rounded-2xl pl-12 pr-5 py-3.5 outline-none transition-all placeholder-slate-300">
                  </div>
                </div>
                
                <div class="md:col-span-2">
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">เบอร์โทรกรณีฉุกเฉิน</label>
                  <div class="relative group">
                    <span class="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2" :class="isEditing ? 'text-rose-500' : 'text-slate-400'">emergency</span>
                    <input type="text" v-model="user.emergencyContact" :disabled="!isEditing" 
                           :class="isEditing ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-900/50 border-transparent text-slate-700 dark:text-slate-300'"
                           class="w-full border text-sm font-semibold rounded-2xl pl-12 pr-5 py-3.5 outline-none transition-all placeholder-slate-300">
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-10 mb-8 pb-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h4 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <span class="material-symbols-rounded">location_on</span>
                </div>
                ที่อยู่ปัจจุบัน (Address)
              </h4>
            </div>

            <div class="space-y-6 bg-slate-50/50 dark:bg-slate-900/30 p-6 md:p-8 rounded-[24px] border border-slate-100 dark:border-slate-800/50">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div class="col-span-2 md:col-span-1">
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">บ้านเลขที่</label>
                  <input type="text" v-model="user.addressNo" :disabled="!isEditing" 
                         :class="isEditing ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-white dark:bg-slate-800/50 border-transparent text-slate-700 dark:text-slate-300'"
                         class="w-full border text-sm font-semibold rounded-xl px-4 py-3.5 outline-none transition-all">
                </div>
                <div class="col-span-2 md:col-span-1">
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">หมู่ที่</label>
                  <input type="text" v-model="user.moo" :disabled="!isEditing" 
                         :class="isEditing ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-white dark:bg-slate-800/50 border-transparent text-slate-700 dark:text-slate-300'"
                         class="w-full border text-sm font-semibold rounded-xl px-4 py-3.5 outline-none transition-all">
                </div>
                <div class="col-span-2 md:col-span-1">
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">ซอย</label>
                  <input type="text" v-model="user.soi" :disabled="!isEditing" 
                         :class="isEditing ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-white dark:bg-slate-800/50 border-transparent text-slate-700 dark:text-slate-300'"
                         class="w-full border text-sm font-semibold rounded-xl px-4 py-3.5 outline-none transition-all">
                </div>
                <div class="col-span-2 md:col-span-1">
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">ถนน</label>
                  <input type="text" v-model="user.road" :disabled="!isEditing" 
                         :class="isEditing ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-white dark:bg-slate-800/50 border-transparent text-slate-700 dark:text-slate-300'"
                         class="w-full border text-sm font-semibold rounded-xl px-4 py-3.5 outline-none transition-all">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">จังหวัด</label>
                  <div class="relative">
                    <select v-model="user.province" @change="handleProvinceChange" :disabled="!isEditing" 
                            :class="isEditing ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-white dark:bg-slate-800/50 border-transparent text-slate-700 dark:text-slate-300'"
                            class="w-full border text-sm font-semibold rounded-xl px-4 py-3.5 outline-none appearance-none transition-all">
                      <option value="">-- เลือกจังหวัด --</option>
                      <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
                    </select>
                    <span class="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" v-if="isEditing">expand_more</span>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">อำเภอ/เขต</label>
                  <div class="relative">
                    <select v-model="user.district" @change="handleDistrictChange" :disabled="!isEditing || !user.province" 
                            :class="isEditing && user.province ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-white dark:bg-slate-800/50 border-transparent text-slate-700 dark:text-slate-300'"
                            class="w-full border text-sm font-semibold rounded-xl px-4 py-3.5 outline-none appearance-none transition-all">
                      <option value="">-- เลือกอำเภอ --</option>
                      <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                    </select>
                    <span class="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" v-if="isEditing && user.province">expand_more</span>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">ตำบล/แขวง</label>
                  <div class="relative">
                    <select v-model="user.subdistrict" @change="handleSubdistrictChange" :disabled="!isEditing || !user.district" 
                            :class="isEditing && user.district ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500/30 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-900 dark:text-white shadow-sm' : 'bg-white dark:bg-slate-800/50 border-transparent text-slate-700 dark:text-slate-300'"
                            class="w-full border text-sm font-semibold rounded-xl px-4 py-3.5 outline-none appearance-none transition-all">
                      <option value="">-- เลือกตำบล --</option>
                      <option v-for="s in subdistricts" :key="s.subdistrict" :value="s.subdistrict">{{ s.subdistrict }}</option>
                    </select>
                    <span class="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" v-if="isEditing && user.district">expand_more</span>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">รหัสไปรษณีย์</label>
                  <div class="relative">
                    <input type="text" v-model="user.zipcode" disabled 
                           class="bg-white dark:bg-slate-800/50 border-transparent text-slate-500 dark:text-slate-400 w-full border text-sm font-semibold rounded-xl px-4 py-3.5 outline-none">
                    <span class="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600">lock</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="isEditing" class="mt-8 animate-[fadeIn_0.3s_ease-in-out]">
              <button @click="saveProfile" class="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 text-base hover:-translate-y-0.5">
                <span class="material-symbols-rounded">save</span> บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-[32px] p-8 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h4 class="text-lg font-black text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <span class="material-symbols-rounded text-amber-500">key</span> เปลี่ยนรหัสผ่านใหม่
              </h4>
              <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">หากต้องการเปลี่ยนรหัสผ่านเพื่อความปลอดภัย สามารถทำได้ที่นี่</p>
            </div>
            <button class="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-900 px-6 py-3 rounded-2xl transition-all border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500/30 w-fit flex items-center gap-2">
              ดำเนินการเปลี่ยนรหัสผ่าน <span class="material-symbols-rounded text-lg">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProvinces, getDistricts, getSubdistricts } from '~/utils/thaiAddress'

useHead({
  title: 'My Profile | Student Panel',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap' }
  ]
})

// บังคับใช้ Layout ของนักศึกษา
definePageMeta({
  layout: 'student'
})

const isEditing = ref(false)
const userCookie = useCookie('user_session')
const user = computed(() => userCookie.value)
const { success: alertSuccess, error: alertError } = useAlerts()

// ดึงข้อมูลโครงงานจริง
const { data: projectData } = await useFetch("/api/student/my-project")
const project = computed(() => projectData.value?.project)

const provinces = computed(() => getProvinces())
const districts = ref([])
const subdistricts = ref([])

onMounted(() => {
  if (user.value?.province) {
    districts.value = getDistricts(user.value.province)
  }
  if (user.value?.province && user.value?.district) {
    subdistricts.value = getSubdistricts(user.value.province, user.value.district)
  }
})

const handleProvinceChange = () => {
  if (user.value) {
    user.value.district = ''
    user.value.subdistrict = ''
    user.value.zipcode = ''
    districts.value = getDistricts(user.value.province)
    subdistricts.value = []
  }
}

const handleDistrictChange = () => {
  if (user.value) {
    user.value.subdistrict = ''
    user.value.zipcode = ''
    subdistricts.value = getSubdistricts(user.value.province, user.value.district)
  }
}

const handleSubdistrictChange = () => {
  if (user.value) {
    const selected = subdistricts.value.find(s => s.subdistrict === user.value.subdistrict)
    if (selected) {
      user.value.zipcode = selected.zipcode
    }
  }
}

const saveProfile = async () => {
  try {
    const data = await $fetch('/api/student/update-profile', {
      method: 'POST',
      body: {
        fullname: user.value.fullname,
        tel: user.value.tel,
        email: user.value.email,
        lineId: user.value.lineId,
        addressNo: user.value.addressNo,
        moo: user.value.moo,
        soi: user.value.soi,
        road: user.value.road,
        subdistrict: user.value.subdistrict,
        district: user.value.district,
        province: user.value.province,
        zipcode: user.value.zipcode,
        homePhone: user.value.homePhone,
        emergencyContact: user.value.emergencyContact
      }
    })

    if (data?.success) {
      alertSuccess('บันทึกสำเร็จ', 'ข้อมูลโปรไฟล์ของคุณถูกอัปเดตเรียบร้อยแล้ว')
      // Update cookie to reflect new data
      Object.assign(user.value, data.user)
      isEditing.value = false
    }
  } catch (e) {
    const errorMessage = e.data?.statusMessage || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
    alertError('ข้อผิดพลาด', errorMessage)
  }
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
