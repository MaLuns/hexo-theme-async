<template>
    <div id="toast" class="toast">
        <slot />
    </div>
</template>
  
<style lang="less" scoped>
.toast {
    position: fixed;
    left: 0;
    right: 0;
    top: 5rem;
    margin: auto;
    width: fit-content;
    color: white;
    background-color: var(--vp-c-brand);
    border-radius: 2rem;
    padding: 0.5rem 2rem;
    box-shadow: 0 0 0.2rem var(--vp-c-brand);
    transition: 0.4s;
    opacity: 0;
    transform: scale(.3);

    &.show {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
  